import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';

import Button from '../../components/common/Button';

import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';


const questions = [
	{
		title: 'Чем Ваш ребёнок предпочитает заниматься в свободное время?',
		answers: [
			{
				title: 'Обычно увлечен своими делами в комнате: читает, рисует, собирает конструктор.',
				points: 1,
			},
			{
				title: 'Как только выдаётся свободная минутка, тут же просится к друзьям и одноклассникам.',
				points: 2,
			},
			{
				title: 'Старается чем-то занять себя рядом с нами: смотрит телевизор с папой, помогает маме на кухне.',
				points: 3,
			},
		],
		multi: true,
	},
	{
		title: 'Какие школьные предметы ему нравятся больше?',
		answers: [
			{
				title: 'Литература, история, музыка — больше склонен к творческим и гуманитарным направлениям.',
				points: 1,
			},
			{
				title: 'Математика, физика, биология. Точные науки — наше всё.',
				points: 2,
			},
			{
				title: 'Физкультура — нам больше по душе физическая, а не умственная активность.',
				points: 3,
			},
		],
		multi: true,
	},
	{
		title: 'В какой компании он охотнее проводит время?',
		answers: [
			{
				title: 'С удовольствием проводит время один.',
				points: 1,
			},
			{
				title: 'Любит, когда вокруг много людей: друзей, гостей, одноклассников.',
				points: 2,
			},
			{
				title: 'Предпочитает проводить время с членами семьи: родителями, бабушками, братьями/сёстрами.',
				points: 3,
			},
		],
		multi: true,
	},
	{
		title: 'Какие качества лучше характеризуют Вашего ребёнка?',
		answers: [
			{
				title: 'Тревожный, несамостоятельный.',
				points: 1,
			},
			{
				title: 'Независимый, спокойный.',
				points: 2,
			},
			{
				title: 'Энергичный, дружелюбный, общительный.',
				points: 3,
			},
		],
		multi: true,
	},
	{
		title: 'Выдался теплый и солнечный денёк. Чем займётся Ваш ребёнок?',
		answers: [
			{
				title: 'Весь день проведёт на улице с другими детьми.',
				points: 1,
			},
			{
				title: 'Будет сидеть дома. Его сложно вдохновить на прогулку.',
				points: 2,
			},
			{
				title: 'Будет весь день крутится возле Вас, не зная, чем ему заняться.',
				points: 3,
			},
		],
		multi: true,
	},
	{
		title: 'Когда Вы с ребёнком приходите к врачу, чем он занимается, дожидаясь очереди?',
		answers: [
			{
				title: 'Он покорно ждёт очереди, находя себе какое-нибудь спокойное занятие.',
				points: 1,
			},
			{
				title: 'Знакомится с другими детьми и придумывает игры вместе с ними.',
				points: 2,
			},
			{
				title: 'Требует внимания родителей: чтобы мы играли с ним и развлекали его.',
				points: 3,
			},
		],
		multi: true,
	},
	{
		title: 'Как Ваш ребёнок ведёт себя на экскурсии?',
		answers: [
			{
				title: 'Внимательно слушает экскурсовода, старается многое запомнить.',
				points: 1,
			},
			{
				title: 'Не может долго сосредоточивать внимание на экскурсии, отвлекается на общение с другими людьми.',
				points: 2,
			},
			{
				title: 'Предпочитает изучать всё самостоятельно, отдельно от группы.',
				points: 3,
			},
		],
		multi: true,
	},
	{
		title: 'Когда в школе организуют какое-либо школьное мероприятие, как поведёт себя Ваш ребёнок?',
		answers: [
			{
				title: 'В первых рядах поспешит принять участие в любой активности. Он любит быть в центре внимания.',
				points: 1,
			},
			{
				title: 'Сам проявлять инициативу не будет, но, если его попросят — не откажется.',
				points: 2,
			},
			{
				title: 'Зависит от мероприятия: если это совпадает с его интересами, скорее всего, поучаствует.',
				points: 3,
			},
		],
		multi: true,
	},
	{
		title: 'Как Ваш ребёнок относится к новому опыту?',
		answers: [
			{
				title: 'Доверяет только тем вещам, которые ему хорошо знакомы.',
				points: 1,
			},
			{
				title: 'Подозрительно. Приходится долго уговаривать, прежде чем он согласится на что-то новое.',
				points: 2,
			},
			{
				title: 'С удовольствием пробует новое: игры, знакомства, увлечения.',
				points: 3,
			},
		],
		multi: true,
	},
	{
		title: 'Что может повлиять на решение Вашего ребёнка о том, как провести вечер?',
		answers: [
			{
				title: 'Ничего. Он предпочитает планировать своё время и редко меняет решение.',
				points: 1,
			},
			{
				title: 'Обычно ребёнок тянется за друзьями. Если друзья позвали гулять, готов бросить все дела.',
				points: 2,
			},
			{
				title: 'Охотно присоединится, если родители предложат ему какую-то активность: совместный просмотр фильма или поход за покупками.',
				points: 3,
			},
		],
		multi: true,
	},
];


const answers = [
	(
		<div>
			<p>
				Похоже, Ваш ребёнок неплохо проводит время наедине с собой. В этом случае Вы всегда можете быть уверены, что он сам найдет, чем себя занять в свободное время. Но любовь к уединению вовсе не означает, что ребёнку не придутся по душе семейные развлечения. Однако выбирая их, Вам стоит сделать упор на спокойные и умиротворяющие занятия, в которых ребёнок сможет одновременно и находиться в кругу семьи, и проявить свою индивидуальность. Вот несколько вариантов проведения семейного досуга для вас.
			</p>
			<p>
				<strong>Концерт</strong>. Музыка способствует гармоничному развитию ребёнка: она успокаивает и расслабляет, развивает воображение, память, творческие способности и художественный вкус. Живой звук — это живая энергетика, которая вызывает сильные и приятные эмоции.
			</p>
			<p>
				<strong>Творческий мастер-класс</strong>. С каждым годом появляется все больше увлекательных и непродолжительных занятий для всей семьи. Вы можете подобрать программу, подходящую именно вам: роспись по стеклу или керамике, лепка из глины, гончарное мастерство, кулинарные занятия, изготовление украшений из полимерной глины, валяние шерсти и многое другое.
			</p>
			<p>
				<strong>Настольные игры</strong>. Игры дают возможность сосредоточиться, проявить свои способности, потренировать мышление. Вы можете выбрать игру по мотивам любимого мультфильма ребёнка или в зависимости от его увлечений: логическую, творческую, интеллектуальную. Такое развлечение разнообразит семейные вечера. Кроме того, вы можете потренировать навыки командной игры, пригласив в качестве соперника семью ваших друзей с детьми.
			</p>
		</div>
	),
	(
		<div>
			<p>
				Похоже, Ваш ребёнок всем видам отдыха предпочитает активный. Это здорово, ведь движение — это жизнь! Доказано, что дети, которые любят двигаться, меньше болеют и, конечно, физически оказываются сильнее, чем их малоподвижные сверстники. Но что делать, если энергии у ребёнка слишком много? Вы можете направить её в полезное русло и предложить один из следующих вариантов досуга.
			</p>
			<p>
				<strong>Поход</strong>. Активные дети с удовольствием принимают участие в занятиях, которые предполагают смену обстановки и перемещение. Отправьтесь вместе с ребёнком в автомобильное путешествие или просто в поход. Если времени не так много, можно просто найти солнечную поляну рядом с домом, собрать корзину для пикника, расстелить покрывало на траве и приготовить шашлыки. Пока готовится еда на огне, ребёнок сможет поиграть в мяч или в бадминтон.
			</p>
			<p>
				<strong>Спорт</strong>. Детям, у которых много энергии, на помощь приходит спорт. Поэтому даже самым занятым родителям стоит иметь в виду возможность организации такого досуга для всей семьи. Почему бы не посвятить один из выходных дней походу в бассейн или аквапарк? В конце концов, можно просто выйти на площадку для катания на роликах, игры в настольный теннис, отправиться на каток или устроить прогулку по городу на велосипеде. Не забудьте фотоаппарат, чтобы составить яркий отчет о том, как вы провели день!

			</p>
			<p>
				<strong>Парк развлечений</strong>. Разнообразие аттракционов и активностей — настоящая находка для ребёнка, которому нужно выплеснуть свои эмоции и энергию. Пока ребёнок исследует горки, покоряет вершины веревочных парков и прыгает на батуте, родители могут отдохнуть за чашкой кофе. А могут и присоединиться к своему чаду и тоже снять стресс после рабочей недели.
			</p>
		</div>
	),
	(
		<div>
			<p>
				Похоже, Ваш ребёнок больше любит проводить время с семьей, чем с компанией друзей. Это здорово! Значит, найти подходящий вариант семейного досуга не составит большого труда. Вы можете экспериментировать с различными вариантами семейных активностей, но начать можно вот с этих.
			</p>
			<p>
				<strong>Экскурсии</strong>. Совместный поход в музей или на выставку — классический вариант семейного времяпрепровождения. Вы можете использовать его, а если он не вызовет большого интереса у ребёнка, попробуйте заменить картинную галерею, например, на кондитерскую фабрику. Провести день в окружении конфет и шоколада — это ли не мечта каждого ребёнка?
			</p>
			<p>
				<strong>Кинотеатр</strong>. Смотреть кино дома — это одно, и совсем другое — отправиться на премьеру долгожданного мультфильма в кинотеатр и посмотреть его на большом экране. Даже если Вам не очень нравятся мультфильмы, попробуйте погрузиться в сюжет и заинтересоваться: ребёнку будет приятно осознать, что Вы тоже получили удовольствие от просмотра и обсудить с Вами увиденное.

			</p>
			<p>
				<strong>Зоопарк</strong>. Животных любят все дети без исключения. Общение с животными специалисты рекомендуют детям для развития ответственности, умения взаимодействовать и заботиться об окружающих. Если в зоопарке вы уже были, можно отправиться в океанариум, дельфинарий, на выставку домашних животных или в цирк. Ребёнку это гарантирует новые знания и впечатления, а взрослым — приятный и насыщенный день, проведенный с семьей, который придаст сил перед началом новой рабочей недели.
			</p>
		</div>
	),
];

class QuizQuestions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentQuestion: 0,
			showResults: false,
			result: 0,
			answers: [
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
			]
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
				}
			});
		}
	}

	_addAnswerPoints(questionIndex, points){

		let answersTemp = [...this.state.answers];

		answersTemp[questionIndex] = points;

		this.setState({
			...this.state,
			...{
				answers: answersTemp,
			}
		});

		console.log(this.state);
	}

	_selectAnswerHandler = (questionIndex, points) => (e) => {
		e.preventDefault();

		this._addAnswerPoints(questionIndex, points);

		setTimeout(() => { //hack for update state twice
		 	this._nextQuestion();
		}, 0);

	}

	_selectMultiAnswerHandler = (questionIndex, points) => (e) => {
		this._addAnswerPoints(questionIndex, points);
	}

	_nextQuestionHandler = () => (e) => {
		e.preventDefault();
		this._nextQuestion();
	}


	_goBackHandler = () => (e) => {
		e.preventDefault();
		this.props.goTo('/');
	}


	_question(questionIndex, question){
		const { props, state } = this;

		return(
			<div
				className="quiz-item__item quiz-item">

					<h3 className="quiz-item__title">
						{question.title}
					</h3>

					<ul className="quiz-item__answers" ref="answers">

						{question.answers.map( (answer, i) => {

							if (question.multi){

								return (
								<li className="quiz-item__answer quiz-item__answer--multi" key={questionIndex + i}>

									<label className="quiz-radio">
										<input 
											type="radio"
											className="quiz-radio__input"
											name={'question' + questionIndex}
											checked={(state.answers[questionIndex] == answer.points)}
											value={answer.points}
											onChange={this._selectMultiAnswerHandler(questionIndex, answer.points)}
										/>
										<span className="quiz-radio__text">
											{answer.title}
										</span>
									</label>

								</li>
								);
							}

							return (
							<li className="quiz-item__answer" key={questionIndex + i}>

								<button
									className="quiz-item__answer-button"
									onClick={this._selectAnswerHandler()}
								>
									{answer.title}
								</button>

							</li>
							);

						})}

					</ul>

					{
						!question.multi
						? null
						:
						(

						<div className="quiz-item__button-placeholder">						

							<Button
								mixClass="quiz-item__button"
								size="l"
								color="red"
								type="button"
								onClickHandler={this._nextQuestionHandler()}
							>
								<span className="button__text">Ответить</span>
							</Button>

						</div>	

						)

					}

			</div>
		);
	}


	render(){
		const { props, state } = this;


		return(
			
			<div className="quiz__page">
				{
					state.showResults
					?
					(
						<div className="quiz__results quiz-results">

							<div className="quiz-results__title">
								Результат
							</div>

							<div className="quiz-results__text text">

								{answers[state.result]}

							</div>	

							<div className="quiz-results__button-placeholder">						

								<Button
									mixClass="quiz-results__button"
									size="m"
									color="gray"
									type="button"
									onClickHandler={this._goBackHandler()}
								>
									<span className="button__text">Пройти заново</span>
								</Button>

							</div>	

						</div>
					)
					:
					(
						<div className="quiz__questions">

							{this._question(state.currentQuestion, questions[state.currentQuestion])}

						</div>
					)
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
