/* eslint-disable react/prop-types */
import React from 'react'
import { Lottie } from '@crello/react-lottie'
// import db from '../../../db.json';
import Widget from '../../components/Widget'
import QuizLogo from '../../components/QuizLogo'
import QuizBackground from '../../components/QuizBackground'
import QuizContainer from '../../components/QuizContainer'
import AlternativesForm from '../../components/AlternativesForm'
import Button from '../../components/Button'
import BackLinkArrow from '../../components/BackLinkArrow'

import loadingAnimation from './animations/loading.json'

type ResultWidgetProps = {
  results: boolean[]
}

function ResultWidget({ results }: ResultWidgetProps) {
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        Tela de Resultado:
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou{' '}
          {/* {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)} */}
          {results.filter(x => x).length} perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #{index + 1} Resultado:
              {result === true ? ' Acertou' : ' Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  )
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
        <Lottie
          width="200px"
          height="200px"
          className="lottie-container basic"
          config={{
            animationData: loadingAnimation,
            loop: true,
            autoplay: true
          }}
        />
      </Widget.Content>
    </Widget>
  )
}

type Question = {
  image: string
  title: string
  description: string
  answer: number
  alternatives: string[]
}

type QuestionWidgetProps = {
  question: Question
  questionIndex: number
  totalQuestions: number
  onSubmit: () => void
  addResult: (result: boolean) => void
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult
}: QuestionWidgetProps) {
  const [selectedAlternative, setSelectedAlternative] = React.useState<
    number | undefined
  >(undefined)
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false)
  const questionId = `question__${questionIndex}`
  const isCorrect = selectedAlternative === question.answer
  const hasAlternativeSelected = selectedAlternative !== undefined

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover'
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm
          onSubmit={infosDoEvento => {
            infosDoEvento.preventDefault()
            setIsQuestionSubmited(true)
            setTimeout(() => {
              addResult(isCorrect)
              onSubmit()
              setIsQuestionSubmited(false)
              setSelectedAlternative(undefined)
            }, 3 * 1000)
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR'
            const isSelected = selectedAlternative === alternativeIndex
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            )
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
}

type QuizPageProps = {
  externalQuestions: Question[]
  externalBg: string
  quizContainerPosition: string
}

export default function QuizPage({
  externalQuestions,
  externalBg,
  quizContainerPosition
}: QuizPageProps) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING)
  const [results, setResults] = React.useState<boolean[]>([])
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const questionIndex = currentQuestion
  const question = externalQuestions[questionIndex]
  const totalQuestions = externalQuestions.length
  const bg = externalBg

  function addResult(result: boolean) {
    // results.push(result);
    setResults([...results, result])
  }

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1 * 2000)
    // nasce === didMount
  }, [])

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion)
    } else {
      setScreenState(screenStates.RESULT)
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer quizContainerPosition={quizContainerPosition}>
        <QuizLogo className="" />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} />
        )}
      </QuizContainer>
    </QuizBackground>
  )
}
