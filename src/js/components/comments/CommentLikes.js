import React from 'react';

const CommentLikes = (props) => {

	const counter = props.counter ? props.counter : false;
	const value = counter ? props.counter.Value : 0;

	return (
		<div className={('comment__likes comments-likes ' + (counter && counter.Liked ? 'comments-likes--liked' : ''))}>

			<button 
				className="comments-likes__button"
				onClick={props.clickHandler}
				disabled={(counter && counter.Liked)}
			>

				<span className="comments-likes__lext">{props.text}</span>
				{' '}
				<span className="comments-likes__count">{value}</span>

			</button>

		</div>
	);
};

CommentLikes.propTypes = {
	mixClass: React.PropTypes.string,
	counter: React.PropTypes.oneOfType([
    	React.PropTypes.bool,
    	React.PropTypes.object,
    ]),
	clickHandler: React.PropTypes.func.isRequired,
	text: React.PropTypes.string.isRequired,
	
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default CommentLikes;
