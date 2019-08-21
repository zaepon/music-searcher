import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { ThemeProvider } from "styled-components";
import { Theme, GlobalStyle } from "./theme";

const Root = () => (
  <ThemeProvider theme={Theme}>
    <>
      <App />
      <GlobalStyle />
    </>
  </ThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
