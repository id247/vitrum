import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as asyncActions from '../../actions/async';

const Pagination = (props) => {

	if (props.pagesCount < 2){
		return null;
	}

	return(
		<div className={( (props.mixClass ? props.mixClass : '') + ' comments-pagination')}>

			<div className="comments-pagination__title">
				Страницы комментариев:
			</div>

			<ul className="comments-pagination__list">

				{[,...Array(props.pagesCount)].map( (value, i)  => {

					let link = '/page/' + (i);

					if (i === 1){
						link = '';
					}

					return (

					<li className="comments-pagination__item" key={i}>

						<a 
							href={ i > 1 ? ('#/page/' + i) : '#/'} 
							className={('comments-pagination__href ' + (i === props.page ? 'comments-pagination__href--active' : '') )}
							onClick={ (e) => {
								e.preventDefault();
								const pageId = i;
								props.setCommentsPage(pageId);
							}}
						>
							{i}
						</a>

					</li>

					);
				})}

			</ul>

		</div>
	)
};

const mapStateToProps = (state, ownProps) => ({
	page: state.comments.page,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	setCommentsPage: (pageId) => dispatch(asyncActions.setCommentsPage(pageId)),
});

Pagination.propTypes = {
	mixClass: React.PropTypes.string,
	pagesCount: React.PropTypes.number.isRequired,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
