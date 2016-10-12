import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/common/Button';

import * as pageActions from '../../actions/page';

class QuizIndex extends React.Component {

	componentWillMount(){
		const { props } = this;
	}

	render(){
		const { props } = this;

		return (

			<div className="app-quiz app-quiz--home">

				<h1 className="app-quiz__title">
					Тест: что Вы знаете <br/>
					о витаминах?
				</h1>

				<div className="app-quiz__text text">
					<p>	
						Витамины очень важны для полноценной работы организма. <br/>
						Недостаток хотя бы одного из них может стать серьёзной угрозой для нашего здоровья. Особенно актуально поддержание витаминного баланса для школьников, ведь с наступлением осени нагрузки на детский организм возрастают. 		
					</p>
					<p>
						Ответьте на вопросы теста, чтобы узнать больше о витаминах, необходимых  для нормального роста, поддержания памяти и интеллектуальных способностей ребёнка, и научиться распознавать «сигналы тревоги», которые подаёт организм, когда нуждается в витаминной поддержке.					
					</p>
				</div>

				<div className="app-quiz__button-placeholder">

					<Button 
						size="m"
						color="transparent-orange"
						type="button"
						onClickHandler={ (e) => {
							props.goTo('/quiz');
						}}
					>
						Начать тест
					</Button>

				</div>

			</div>

		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	goTo: (page) => dispatch(pageActions.setPage(page)),
});

QuizIndex.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizIndex);
