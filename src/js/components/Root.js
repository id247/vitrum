import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Loading 			from '../components/loading/Loading';
import ErrorMessage 	from '../components/error/ErrorMessage';
import Login 			from '../components/login/Login';

import App 				from '../components/App';
import Comments 		from '../components/comments/Comments';

import Quiz 			from '../components/Quiz';
import QuizIndex 		from '../components/quiz/QuizIndex';
import QuizQuestions 	from '../components/quiz/QuizQuestions';

let routes;

if (location.href.indexOf('vitrum-quiz') > -1){

	routes = (
		<Router history={hashHistory}>
			<Route path="/" component={Quiz}>
				<IndexRoute component={QuizIndex} />
				<Route path="quiz" component={QuizQuestions} />
			</Route>
		</Router>
	);

}else{

	routes = (
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Comments} />
			</Route>
			<Route path="/login" component={Login} mixClass="app__page" />
		</Router>
	);

}

class Root extends React.Component {

	render() {		
		return (
			<Provider store={this.props.store}>		
				<div className="app">
					{routes}
					
					<Loading 
						mixClass="app__loader"
						visibleClass="loader--visible"
					/>
					
					<ErrorMessage 
						mixClass="app__error"
					/>
				</div>
			</Provider>
		);
	}
}

export default Root;

