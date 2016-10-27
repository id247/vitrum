import React from 'react';
import { connect } from 'react-redux';

import { CommentsOptions } from 'appSettings';

import * as commentsActions from '../../actions/comments';
import * as asyncActions 	from '../../actions/async';

import Form 			from '../../components/comments/Form';
import CommentsList 	from '../../components/comments/CommentsList';
import CommentsEmpty 	from '../../components/comments/CommentsEmpty';
import Pagination 		from '../../components/comments/Pagination';

class Comments extends React.Component {
	componentWillMount(){
		const { props } = this;

		this._setLabel();

		const pageNumber = props.params.pageNumber ? parseInt(props.params.pageNumber) : 1;

		console.log(props.params);

		props.getComments(pageNumber);
	}

	_setLabel(){
		const { props } = this;

		let host = document.location.host;
		let pathname = document.location.pathname;

		if (pathname[pathname.length - 1] === '/'){
			pathname = pathname.slice(0, -1);
		}

		const label = (host + pathname);
		
		props.setCommentsLabel(label);
	}
	
	componentWillReceiveProps(nextProps){

		console.log(nextProps.params);

		const { props } = this;
		const oldPageNumber = props.params.pageNumber ? parseInt(props.params.pageNumber) : 1;
		const newPageNumber = nextProps.params.pageNumber ? parseInt(nextProps.params.pageNumber) : 1;

		if (oldPageNumber !== newPageNumber){
			props.getComments(newPageNumber);
		}
	}

	render(){
		const { props } = this;
		const pagesCount = Math.ceil(props.commentsTotalCount / CommentsOptions.pageSize);
		return(
				
			<div className="comments__content">
				
				<Form mixClass="comments__form" />
				
				{ 
					props.commentsTotalCount > 0
					?	<CommentsList 
							mixClass="comments__list" 
						/>
					: 
						<CommentsEmpty 
							mixClass="comments__empty" 
						/>
				}
				
				
				<Pagination
					mixClass="comments__pagination"
					pageNumber={parseInt(props.params.pageNumber)}
					pagesCount={pagesCount}
				/>
			</div>

		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	commentsTotalCount: state.comments.itemsTotalCount,
	pageNumber: state.comments.page,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	setCommentsLabel: (label) => dispatch(commentsActions.setLabel(label)),
	getComments: (pageNumber) => dispatch(asyncActions.getComments(pageNumber)),
});

Comments.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
