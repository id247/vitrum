import React from 'react';
import { Link } from 'react-router';

import * as asyncActions from '../../actions/async';
import * as visual from '../../helpers/visual.js';

const Pagination = (props) => {

	if (props.pagesCount < 2){
		return null;
	}

	const pageNumber = props.pageNumber > 1 ? props.pageNumber : 1;
	const scrollTo = document.querySelector('#app');

	return(
		<div className={( (props.mixClass ? props.mixClass : '') + ' comments-pagination')}>

			<div className="comments-pagination__title">
				Страницы советов:
			</div>

			<ul className="comments-pagination__list">

				{[,...Array(props.pagesCount)].map( (value, i)  => (

					<li className="comments-pagination__item" key={i}>

						<a 
							href={ i > 1 ? ('#/page/' + i) : '#/'} 
							className={('comments-pagination__href ' + (i === pageNumber ? 'comments-pagination__href--active' : '') )}
							onClick={(e)=>{
								visual.scrollTo(document.body, scrollTo, 200);
							}}
						>
							{i}
						</a>

					</li>

				))}

			</ul>

		</div>
	)
};

Pagination.propTypes = {
	mixClass: React.PropTypes.string,
	pagesCount: React.PropTypes.number.isRequired,
	pageNumber: React.PropTypes.number,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default Pagination;
