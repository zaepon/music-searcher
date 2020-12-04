import React, { createContext, useState } from "react";
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

export const AuthContext = createContext({
  accessToken: "",
  setToken: (s: string) => {},
});

const Root = (props: HistoryProps) => {
  const [accessToken, setAccessToken] = useState("");

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={Theme}>
        <AuthContext.Provider
          value={{
            accessToken: accessToken,
            setToken: (s) => setAccessToken(s),
          }}
        >
          <>
            <App />
            <GlobalStyle />
          </>
        </AuthContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

const customHistory = createBrowserHistory();
ReactDOM.render(
  <Root history={customHistory} />,
  document.getElementById("root")
);
