import { ThemeProvider } from 'styled-components'
import { AppProps } from 'next/app'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  )
}
