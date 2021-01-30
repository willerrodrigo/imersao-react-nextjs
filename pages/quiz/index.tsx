/* eslint-disable react/prop-types */
import React from 'react'
import { ThemeProvider } from 'styled-components'
import QuizScreen from '../../src/screens/Quiz'
import db from '../../db.json'

import theme from '../../styles/theme'

export default function MeuQuiz() {
  return (
    <ThemeProvider theme={theme}>
      <QuizScreen
        externalQuestions={db.questions}
        externalBg={db.bg}
        quizContainerPosition="right"
      />
    </ThemeProvider>
  )
}
