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
    background-image: linear-gradient(0deg, #FFFFFF, #8D94BA 95%);
  }

`

export { Theme, GlobalStyle }