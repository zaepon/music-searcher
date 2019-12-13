import React from "react";
import ReactDOM from "react-dom";
import Main from "./containers/Main";

import { ThemeProvider } from "styled-components";
import { Theme, GlobalStyle } from "./theme";
import { BrowserRouter as Router, Route } from 'react-router-dom';
require("dotenv").config();


const Root = () => (
  <ThemeProvider theme={Theme}>
    <>
      <Router>
        <Route path='/' exact component={Main} />  
      </Router>
      <GlobalStyle />
    </>
  </ThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
