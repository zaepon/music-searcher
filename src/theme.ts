// my-theme.ts
import { DefaultTheme, createGlobalStyle } from 'styled-components'

const Theme: DefaultTheme = {
  borderRadius: '5px',

  colors: {
    main: 'cyan',
    secondary: 'magenta',
  },
}


const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100vh;
    background-image: linear-gradient(0deg,#4e4376,#2b5876  95%);
    font-family: verdana;
    background-attachment: fixed;
  }

`

export { Theme, GlobalStyle }