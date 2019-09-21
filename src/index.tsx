import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Main from "./containers/Main";
import Artist from "./containers/Artist";

import { ThemeProvider } from "styled-components";
import { Theme, GlobalStyle } from "./theme";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer, { initialState } from "./store/reducer";
import { BrowserRouter as Router, Route } from 'react-router-dom';
require("dotenv").config();

const store = createStore(reducer, initialState, applyMiddleware(thunk));

const Root = () => (
  <ThemeProvider theme={Theme}>
    <>
      <Provider store={store}>
      <Router>
        <Route path='/' exact component={Main} />
        <Route path='/artist/:id' component={Artist} />        
      </Router>
      </Provider>
      <GlobalStyle />
    </>
  </ThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
