import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';

import Button from '../../components/common/Button';

import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';


const questions = [
	{
		title: (
				<span>
					Этот витамин отвечает за регуляцию процессов роста. <br /> Он активизирует функции восприятия информации.
				</span>
			),
		answers: [
			{
				title: 'Железо',
				points: 0,
			},
			{
				title: 'Цинк',
				points: 1,
			},
		],
		results: {
			0: (
				<span>
					Это цинк. Дети, в организме которых не хватает цинка, больше подвержены инфекционным и вирусным заболеваниям. Железо же участвует в образовании гемоглобина крови и переносе кислорода.
				</span>
			),
			1: (
				<span>
					При недостатке цинка в организме детям сложнее усваивать и запоминать информацию.  Кроме того, такие дети больше подвержены инфекционным и вирусным заболеваниям.
				</span>
			),
		},
	},
	{
		title: (
				<span>
					Чаще всего, витамины содержатся в продуктах. Но этот витамин содержится в солнечных лучах! Он обеспечивает минерализацию костей и зубов, предохраняет от рахита и снижает риск развития аллергии.
				</span>
			),
		answers: [
			{
				title: 'Витамин D',
				points: 1,
			},
			{
				title: 'Витамин E',
				points: 0,
			},
		],
		results: {
			1: (
				<span>
					Кроме солнечных лучей, он содержится в печени рыб, яйцах и молочных продуктах. При недостатке этого витамина наблюдается потливость, деформация позвоночника и конечностей, ослабление мышечного тонуса.
				</span>
			),
			0: (
				<span>
					Это витамин D. Кроме солнечных лучей, он содержится в печени рыб, яйцах и молочных продуктах. А витамин E защищает сердце и органы кровообращения.
				</span>
			),
		},
	},
	{
		title: (
				<span>
					При недостатке этого витамина у ребёнка наблюдается повышенная склонность к простудам, медленное заживление ран и ушибов, кровоточивость десен и кровотечения из носа.
				</span>
			),
		answers: [
			{
				title: 'Витамин С',
				points: 1,
			},
			{
				title: 'Биотин',
				points: 0,
			},
		],
		results: {
			1: (
				<span>
					Именно он отвечает за поддержку иммунитета, поддерживает здоровое состояние стенок сосудов и слизистых оболочек. Содержится витамин C во фруктах, овощах, ягодах и зелени.
				</span>
			),
			0: (
				<span>
					Это витамин C. Именно он отвечает за поддержку иммунитета, поддерживает здоровое состояние стенок сосудов и слизистых оболочек. А биотин важен для кожи, обмена веществ и хорошего аппетита.
				</span>
			),
		},
	},
	{
		title: (
				<span>
					Этот витамин нужен для правильной работы центральной нервной системы. Его недостаток приводит к необратимому снижению памяти и интеллекта ребёнка, заторможенной реакции и мышлению, бессоннице.
				</span>
			),
		answers: [
			{
				title: 'Витамин P',
				points: 0,
			},
			{
				title: 'Витамин B6 (пиридоксин)',
				points: 1,
			},
		],
		results: {
			1: (
				<span>
					Он содержится в печени животных, молочных продуктах, фруктах и овощах. Из плодов больше всего пиридоксина содержат бананы. А витамин P отвечает за регенерацию и заживление тканей, укрепление стенок сосудов и иммунитета.
				</span>
			),
			0: (
				<span>
					Витамин P отвечает за регенерацию и заживление тканей, укрепление стенок сосудов и иммунитета. При его недостатке могут наблюдаться внутрикожные или подкожные кровоизлияния и кровоточивость дёсен у детей.
				</span>
			),
		},
	},
	{
		title: (
				<span>
					Этот витамин в большом количестве представлен в рыбе и соли. Он необходим для нормального функционирования головного мозга и поддержания функции щитовидной железы, улучшает ясность ума.
				</span>
			),
		answers: [
			{
				title: 'Марганец',
				points: 0,
			},
			{
				title: 'Йод',
				points: 1,
			},
		],
		results: {
			1: (
				<span>
					Когда его недостаточно, происходит отставание в росте и интеллектуальном развитии, снижается способность к обучению, ухудшается память, развивается сонливость, вялость и быстрая утомляемость.
				</span>
			),
			0: (
				<span>
					Марганец нужен для синтеза хрящевой ткани и образования костей. Он содержится в бобовых, орехах и цельнозерновых продуктах.
				</span>
			),
		},
	},
	{
		title: (
				<span>
					Фолиевая кислота (B9) сохраняет краткосрочную и долгосрочную память, влияет на скорость мышления у детей. При недостатке B9 возникают проблемы с памятью, наблюдается апатия. А в каких продуктах она содержится?
				</span>
			),
		answers: [
			{
				title: 'Листья салата, зелень петрушки, шпинат, свёкла, картофель, бобы, томаты, пшеница, дрожжи.',
				points: 1,
			},
			{
				title: 'Морская капуста, морепродукты, чеснок, шпинат, яйца.',
				points: 0,
			},
		],
		results: {
			1: (
				<span>
					Фолиевая кислота, кроме прочего, стимулирует выработку серотонина — «гормона радости», способствуя улучшению психологического состояния. А морская капуста и морепродукты — незаменимые источники йода, не менее важного для организма школьника.
				</span>
			),
			0: (
				<span>
					Эти продукты — источники йода, несомненно, одного из важнейших витаминов для школьника. Фолиевая кислота же содержится в зелени, бобовых, пшенице, ржи и дрожжах.
				</span>
			),
		},
	},
	{
		title: (
				<span>
					Эти витамины помогают концентрации внимания, а потому очень важны для школьника. <br/>
					Какие?
				</span>
			),
		answers: [
			{
				title: 'Инозитол (В8) и Холин (В4)',
				points: 1,
			},
			{
				title: 'Витамин А и Витамин К',
				points: 0,
			},
		],
		results: {
			1: (
				<span>
					B4, кроме того, способствует улучшению памяти, уменьшает уязвимость мозга к токсинам у ребёнка, а B8 поддерживает нормальное функциональное состояние нервной системы.
				</span>
			),
			0: (
				<span>
					Миссия витамина К — обеспечивать хорошую свёртываемость крови, а витамин А отвечает за поддержку иммунитета, скорость роста и развития, зрение, состояние кожных покровов и слизистых оболочек.
				</span>
			),
		},
	},
	{
		title: (
				<span>
					Не все витамины содержатся в продуктах в необходимом организму количестве. Например, чтобы восполнить потребность в этом витамине, человеку нужно каждый день съедать 7 кг белокочанной капусты или 600 г лимонов с кожурой. Что это за витамин?
				</span>
			),
		answers: [
			{
				title: 'Витамин С',
				points: 1,
			},
			{
				title: 'Витамин D',
				points: 0,
			},
		],
		results: {
			1: (
				<span>
					Столько капусты и лимонов съесть мы, конечно, не в состоянии. Именно поэтому рекомендуется принимать витаминно-минеральные комплексы, разработанные с учётом суточной потребности организма в тех или иных витаминах.
				</span>
			),
			0: (
				<span>
					Это витамин С. А витамин D вырабатывается при воздействии на кожу человека ультрафиолетовых лучей. Мы не можем получить его из продуктов. Именно поэтому рекомендуется принимать витаминно-минеральные комплексы, разработанные с учётом суточной потребности организма в тех или иных витаминах.
				</span>
			),
		},
	},
];


const answers = {
	good: (
		<p>
			Вы неплохо разбираетесь в витаминах — это здорово! Узнать ещё больше полезной информации, чтобы во всеоружии встретить осенне-зимний сезон, Вы можете в <a href={PromoOptions.url}>материалах нашего проекта!</a>
		</p>
		),
	bad: (
		<p>
			Чтобы подкрепить знания о витаминах и узнать, как поддержать организм школьника в осенне-зимний период, воспользуйтесь <a href={PromoOptions.url}>полезными материалами нашего проекта</a>!'
		</p>
	),
};

class QuizQuestions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentQuestion: 0,
			showAnswer: false,
			showResults: false,
			result: 0,
			answers: questions.map( ( ) => 0 ),
			points: questions.map( (question) => question.answers[0].points ),
		};

	}

	componentWillMount(){
		const { props } = this;
	}

	componentWillUnmount(){
	}

	componentDidMount(){
	}

	_nextQuestion(){
		const { props, state } = this;

		console.log(state.currentQuestion);

		if (state.currentQuestion === questions.length - 1){
			//props.getResults(state.answers);
			
			const compiledAnswers = state.answers.reduce( (prev, answer) => {
				prev[answer-1]++;
				
				return prev;
			},[0,0,0]);

			const result = compiledAnswers.indexOf(Math.max(...compiledAnswers));

			console.log(compiledAnswers, result);

			this.setState({
				...state,
				...{
					result: result,
					showResults: true,
				}
			});

		}else{
			this.setState({
				...state,
				...{
					currentQuestion: state.currentQuestion + 1,
					showAnswer: false,
				}
			});
		}
	}

	_addAnswerPoints(questionIndex, answerIndex, points){

		let answersTemp = [...this.state.answers];
		let pointsTemp = [...this.state.points];

		answersTemp[questionIndex] = answerIndex;
		pointsTemp[questionIndex] = points;

		console.log(answersTemp);
		console.log(pointsTemp);

		this.setState({
			...this.state,
			...{
				answers: answersTemp,
				points: pointsTemp,
			}
		});

	}

	_showAnswer(){
		this.setState({
			...this.state,
			...{
				showAnswer: true,
			}
		});		
	}

	_selectAnswerHandler = (questionIndex, answerIndex, points) => (e) => {
		this._addAnswerPoints(questionIndex, answerIndex, points);
	}

	_showAnswerHandler = () => (e) => {
		e.preventDefault();
		this._showAnswer();
	}

	_nextQuestionHandler = () => (e) => {
		e.preventDefault();
		this._nextQuestion();
	}

	_goBackHandler = () => (e) => {
		e.preventDefault();
		this.props.goTo('/');
	}


	_question(){
		const { props, state } = this;

		const questionIndex = state.currentQuestion;
		const question = questions[state.currentQuestion];

		return(
			<div className="app-quiz__question app-quiz-question">

				<div className="app-quiz-question__count">
					Вопрос {questionIndex + 1}/{questions.length}
				</div>

				<h3 className="app-quiz__title app-quiz-question__title">
					{question.title}
				</h3>

				<ul className="app-quiz-question__answers" ref="answers">

					{question.answers.map( (answer, i) => (
						<li className="app-quiz-question__answer" key={questionIndex + i}>

							<label className="app-quiz-radio">
								<input 
									type="radio"
									className="app-quiz-radio__input"
									name={'question' + questionIndex}
									checked={(state.answers[questionIndex] === i)}
									value={answer.points}
									onChange={this._selectAnswerHandler(questionIndex, i, answer.points)}
								/>
								<span className="app-quiz-radio__text">
									{answer.title}
								</span>
							</label>

						</li>
					))}

				</ul>

				<div className="app-quiz__button-placeholder">						

					<Button
						mixClass="app-quiz__button"
						size="m"
						color="transparent-orange"
						type="button"
						onClickHandler={this._showAnswerHandler()}
					>
						<span className="button__text">Ответить</span>
					</Button>

				</div>	

			</div>
		);
	}

	_answer(){
		const { props, state } = this;

		const questionIndex = state.currentQuestion;
		const question = questions[state.currentQuestion];

		const points = state.points[questionIndex];

		const title = points > 0 
				? 'Верно!'
				: 'Не верно'
				;

		return (
			<div className="app-quiz__answer">

				<h3 className="app-quiz__title">
					{title}
				</h3>

				<div className="app-quiz__text text">
					<p>
						{question.results[points]}
					</p>
				</div>

				<div className="app-quiz__button-placeholder">						

					<Button
						mixClass="app-quiz__button"
						size="m"
						color="transparent-green"
						type="button"
						onClickHandler={this._nextQuestionHandler()}
					>
						<span className="button__text">Продолжить</span>
					</Button>

				</div>	

			</div>
		);
	}

	_results(){
		const { state } = this;

		const correctAnswers = state.points.reduce( (prev, point) => (prev + point), 0);
		const answerId = ( correctAnswers >= questions.length / 2 )  ? 'good' : 'bad';

		return (
			<div className="app-quiz__answer">

				<div className="app-quiz__title">
					Результат
				</div>

				<div className="app-quiz__text text">

					<p>
						Вы ответили верно на {correctAnswers} из {questions.length} вопросов.
					</p>

					{answers[answerId]}						

				</div>	

				<div className="app-quiz__button-placeholder">						

					<Button
						mixClass="quiz-results__button"
						size="m"
						color="orange"
						type="button"
						onClickHandler={this._goBackHandler()}
					>
						<span className="button__text">Пройти заново</span>
					</Button>

				</div>	

			</div>			
		);
	}

	_questions(){
		return(
			!this.state.showAnswer
			?
			this._question()
			:
			this._answer()
		);
	}


	render(){
		return(
			<div className="app-quiz">
				{
					this.state.showResults
					?
					this._results()
					:
					this._questions()
				}
			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	quiz: state.quiz,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	setQuizData: (data) => dispatch(asyncActions.setQuizData(data)),
	redirect: (page) => dispatch(pageActions.setPageWithoutHistory(page)),
	goTo: (page) => dispatch(pageActions.setPage(page)),
});

QuizQuestions.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizQuestions);
