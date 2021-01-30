import styled from 'styled-components'

type QuizContainerProps = {
  quizContainerPosition: string
}

const QuizContainer = styled('div')<QuizContainerProps>`
  float: ${({ quizContainerPosition }) => quizContainerPosition};
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  padding-bottom: 10px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`

export default QuizContainer
