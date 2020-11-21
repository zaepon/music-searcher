import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "styled-components";
import { Theme, GlobalStyle } from "./theme";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { App } from "./app";
require("dotenv").config();



interface HistoryProps {
  history: any;
}
 


const Root = (props: HistoryProps) => {
  return (
    <ApolloProvider client={client}>
    <ThemeProvider theme={Theme}>
      <>
        <App />
        <GlobalStyle />
      </>
    </ThemeProvider>
</ApolloProvider>
  );
};

const customHistory = createBrowserHistory();
ReactDOM.render(
  <Root history={customHistory} />,
  document.getElementById("root")
);
