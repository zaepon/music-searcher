// my-theme.ts
import { DefaultTheme, createGlobalStyle } from 'styled-components'

const Theme: DefaultTheme = {
  breakpoints: ['40em', '52em', '64em'],
  colors: {
    main: 'cyan',
    secondary: 'magenta',
    dark: '#0b0c10',
    color2: '#1f2833',
    color3: '#c5c6c7',
    color4: '#66fcf1',
    light: '#fff',
    stark: '#e7dfdd',
    color5: '#45a29e'
  },
}


const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100vh;
    font-family: verdana;
    background-color: #0b0c10;
  }
`

export { Theme, GlobalStyle }