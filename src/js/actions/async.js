import API from '../api/api';
import OAuth from '../api/hello';

import { HTMLencode, HTMLdecode } from '../helpers/escape';

import { CommentsOptions } from 'appSettings';

import * as visual from '../helpers/visual.js';

import * as loadingActions 		from '../actions/loading';
import * as errorActions 		from '../actions/error';
import * as userActions 		from '../actions/user';
import * as pageActions 		from '../actions/page';
import * as commentsActions 	from '../actions/comments';
import * as commentsFormActions from '../actions/comments-form';


//error handler

export function catchError(err){
	return dispatch => {
		
		let errorStart = 'Ошибка ' + err.message + ':';
		let errorEnd = 'Попробуйте обновить страницу.';

		//kind of bigfix for ie10 bug with 401 statuses
		if (err.message === 'Network request failed' && !err.description){
			dispatch(logout());
			return;
		}

		if (!err.description) {
			console.error(errorStart + ' ' + err);			
			dispatch(errorActions.setError(errorStart + err + errorEnd));
			return;
		}

		let description = err.description;

		if (err.description.type && err.description.description){

			description = err.description.type + ' (' + err.description.description + ')'; 

		}

		console.error(errorStart + ' ' + description);

		switch (err.message){
			case 401:					
				dispatch(logout());
				return;
				
				break;
			case 403: 
				errorEnd = 'Отказано в доступе.'
				
				break;
			case 404: 
				errorEnd = 'Запрошеный ресурс не найден.'
				
				break;
		}

		dispatch(errorActions.setError(errorStart + ' ' + description + ' ' + errorEnd));
	
	}
}

// authorisation

export function login() {
	return dispatch => {
		dispatch(loadingActions.loadingShow());
		
		return OAuth.login()
		.then( () => {
			dispatch(loadingActions.loadingHide());	

			dispatch(pageActions.setPageWithoutHistory('/'));
		},(err) => {
			dispatch(loadingActions.loadingHide());	

			//dispatch(catchError(err));
		});
	}
}


export function logout() {
	return dispatch => {
		OAuth.logout();
		dispatch(userActions.userUnset());
		dispatch(pageActions.setPageWithoutHistory('/login'));
	}
}


//comments

export function addComment(value) {

	return (dispatch, getState) => {
		dispatch(loadingActions.loadingShow());	
		dispatch(commentsFormActions.commentNotAdded());

		const label = getState().comments ? getState().comments.label : 'comments';
		const pageNumber = getState().comments ? getState().comments.page : 1;
		
		const userId = getState().user.profile.id;

		const data = {
			key: 'comment-' + userId + '-' + new Date().getTime(),
			value: value,
			permissionLevel: 'Public',
			label: label,
		}

		return API.addKeyToDB(data)
		.then( (res) => {	
			dispatch(loadingActions.loadingHide());

			dispatch(commentAdded());

			setTimeout( () => {
				dispatch(commentsFormActions.commentNotAdded());
			}, 3000);

			if (pageNumber === 1){
				dispatch(getComments());
			}else{
				dispatch(setCommentsPage(1));
			}

		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}

export function commentAdded() {

	return (dispatch, getState) => {
		dispatch(commentsFormActions.messageClear());
		dispatch(commentsFormActions.deleteQuote());
		dispatch(commentsFormActions.commentAdded());
	}
}

export function getComments() {

	console.log('get comments');

	return (dispatch, getState) => {
		dispatch(loadingActions.loadingShow());	

		const pageNumber = getState().comments ? getState().comments.page : 1;
		const label = getState().comments ? getState().comments.label : 'comments';

		let comments;
		let counters;
		let firstPageCounters;

		const countersPageSize = 100;

		return API.getKeysFromDBdesc(label, pageNumber, CommentsOptions.pageSize)
		.then( res => {
			comments = res;
			return API.getCoutersFromDBdesc(label, 1, countersPageSize); //fist request to get counters total count
		})
		.then( res => {			
			firstPageCounters = res.Counters;

			if (res.Paging.count < countersPageSize){
				return []; //return empry array if 1 page is enouth
			}

			const pagesCount = Math.ceil(res.Paging.count / countersPageSize);
			const pageNumbers = Array.from(Array(pagesCount).keys());

			console.log(pageNumbers);

			return getChunkPromises(pageNumbers, 10, (pages) => {
				console.log(pages);
				return pages
				.filter( page => page > 0) //filter out first page
				.map( page => API.getCoutersFromDBdesc(label, page + 1,  countersPageSize) );
			});

		})
		.then( results => {

			console.log(results);

			const counters = results.reduce( (prev, res) => {
				return [...prev, ...res.Counters];
			}, []);

			const allCounters = [...firstPageCounters, ...counters];
			
			console.log(counters);
			
			dispatch(loadingActions.loadingHide());

			console.log(comments.Keys);
			console.log(counters);

			comments.Keys = comments.Keys.map( key => {
				key.counter = false;

				allCounters.map( counter => {
					if (parseInt(counter.Name) === key.Id){
						key.counter = counter;
					}
				});

				return key;
			});

			console.log(comments, counters);
			dispatch(commentsActions.addItems({comments: comments, counters: allCounters}));
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err));
		});
	}
}

export function deleteComment(commentId) {

	return (dispatch, getState) => {

		const roles = getState().user.profile.roles;

		if (roles.indexOf('System') === -1){
			return false;
		}

		if (!confirm('Уверены что хотите удалить эту запись?')){
			return false;
		}

		dispatch(loadingActions.loadingShow());	

		return API.deleteKeyFromDB(commentId)
		.then( (res) => {	
			console.log(res);
			dispatch(loadingActions.loadingHide());

			if (res.type !== 'systemForbidden'){
				dispatch(getComments());
			}
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}


export function editComment(comment, data) {

	return (dispatch, getState) => {

		const label = getState().comments ? getState().comments.label : 'comments';
		const pageNumber = getState().comments ? getState().comments.page : 1;

		let oldValue 

		try{
			oldValue = JSON.parse(HTMLdecode(comment.Value));
		}catch(e){
			console.error(e);
			return false;
		}
		
		const oldQuote = oldValue.quote;
		
		let oldQuoteValue;

		try{
			oldQuoteValue = oldQuote ? JSON.parse(HTMLdecode(oldQuote.Value)) : false;
		}catch(e){
			console.error(e);
			return false;
		}

		let newQuoteValue;
		let newQuote;
		
		if (data.newQuoteMessage && oldQuote){

			newQuoteValue = {
				...oldQuoteValue, 
				...{
					message: data.newQuoteMessage
				}
			};

			newQuoteValue = HTMLencode(JSON.stringify(newQuoteValue));

			newQuote = {
				...oldValue.quote,
				...{Value: newQuoteValue}
			}			

		}

		if (data.newQuoteMessage === ''){
			newQuote = false;
		}


		console.log(oldQuote);
		console.log(newQuote);
	
		let newValue = {
			...oldValue, 
			...{
				message: data.newMessage,
				quote: newQuote !== undefined ? newQuote : oldQuote,
			}
		};

		console.log(oldValue);
		console.log(newValue);

		newValue = HTMLencode(JSON.stringify(newValue));

		const newComment = {...comment, ...{Value: newValue}};

		console.log(comment);
		console.log(newComment);
		//return;


		return API.addKeyToDB(newComment)
		.then( (res) => {	
			dispatch(loadingActions.loadingHide());
			
			dispatch(commentsActions.editOff());

			dispatch(getComments());

		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}

export function vote(keyId) {

	return (dispatch, getState) => {
		dispatch(loadingActions.loadingShow());	
		
		const label = getState().comments ? getState().comments.label : 'comments';

		return API.voteForCounterFromDB(keyId, label)
		.then( (res) => {	
			console.log(res);
			dispatch(loadingActions.loadingHide());

			if (res.type !== 'systemForbidden'){
				dispatch(getComments());
			}
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}

export function addQuote(quote) {

	return dispatch => {

		dispatch(commentsFormActions.addQuote(quote)); 
		visual.scrollTo(document.body, document.querySelector('.comments'), 600);

	}
}


export function setCommentsPage(pageId) {

	return (dispatch, getState) => {

		const pageUrl = pageId > 1 ? '/page/' + pageId : '/';

		if (getState().comments && getState().comments.page !== pageId){
			dispatch(commentsActions.setPage(pageId)); 
			visual.scrollTo(document.body, document.querySelector('.comments'), 200);
		}	
		
	}
}

//comments form
export function commentsFormSubmit() {

	return (dispatch, getState) => {

		const state = getState();

		const message = state.commentsForm.message;
		const anon = state.commentsForm.anon;
		const quote = state.commentsForm.quote;

		const { profile } = state.user;

		let user;
		const anonAvatar = CommentsOptions.anonAvatar;

		if (!anon){
			user = {
				id: profile.id_str,
				firstName: profile.firstName,
				lastName: profile.lastName,
				roles: profile.roles,
				photoSmall: profile.photoMedium ? profile.photoMedium : anonAvatar,
			}
		}else{
			user = {
				id: 0,
				firstName: 'Аноним',
				lastName: '',
				roles: [],
				photoSmall: anonAvatar,
			}			
		}

		let value = {
			user: user,
			message: message,
			quote: quote,
		}

		value = HTMLencode(JSON.stringify(value));

		console.log(value);

		dispatch(addComment(value));
		
	}
}


//init

export function getInitialData() {

	return dispatch => {
		dispatch(loadingActions.loadingShow());	

		return API.getUser()
		.then( (user) => {	
			dispatch(loadingActions.loadingHide());

			dispatch(userActions.userSet(user));
			dispatch(pageActions.setPageWithoutHistory('/'));
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(pageActions.setPageWithoutHistory('/login'));
			dispatch(catchError(err)); 
		})
		.then( () => {			
			
		})
	}
}


export function init() {
	return dispatch => {
		return dispatch(getInitialData());	
	}
}

