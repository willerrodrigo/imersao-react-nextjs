import { GetServerSideProps } from 'next'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import QuizScreen from '../../src/screens/Quiz'

type QuizDaGalera = {
  dbExterno: any
}

export default function QuizDaGalera({ dbExterno }: QuizDaGalera) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
        quizContainerPosition="left"
      />
    </ThemeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query
}: any) => {
  const [projectName, githubUser] = query.id.split('___')

  try {
    const dbExterno = await fetch(
      `https://${projectName}.${githubUser}.vercel.app/api/db`
    )
      .then(respostaDoServer => {
        if (respostaDoServer.ok) {
          return respostaDoServer.json()
        }

        throw new Error('Falha em pegar os dados')
      })
      .then(respostaConvertidaEmObjeto => respostaConvertidaEmObjeto)
      .catch(err => {
        console.error(err)
      })

    return {
      props: {
        dbExterno
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}
