import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Input from '../src/components/Input'
import Button from '../src/components/Button'

import db from '../db.json'

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState('')

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault()

    router.push(`/quiz?name=${name}`)
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo className="" />

        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>

            <form onSubmit={handleFormSubmit}>
              <Input
                name="nomeDoUsuario"
                onChange={event => setName(event.target.value)}
                placeholder="Diz ai seu nome"
                value={name}
              />

              <Button type="submit" disabled={!name}>
                Jogar
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>Em breve...</p>
          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/willerrodrigo" />
    </QuizBackground>
  )
}
