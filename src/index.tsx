import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/App";
import { ThemeProvider } from "styled-components";
import { Theme, GlobalStyle } from "./theme";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer, { initialState } from "./store/reducer";
require('dotenv').config()

const store = createStore(reducer, initialState, applyMiddleware(thunk));

const Root = () => (
  <ThemeProvider theme={Theme}>
    <>
      <Provider store={store}>
        <App />
      </Provider>
        <GlobalStyle />
    </>
  </ThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
