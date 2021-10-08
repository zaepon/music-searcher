import React, { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "styled-components";
import { Theme, GlobalStyle } from "./theme";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { App } from "./app";
import {setAccessToken } from "./accessToken"; 
require("dotenv").config();

interface HistoryProps {
  history: any;
}

export const AuthContext = createContext({
  isLogged: false,
  setToken: (s: string) => {
    setAccessToken(s)
  },
});


const Root = (props: HistoryProps) => {
  const { setToken } = useContext(AuthContext);
  const [isLogged, setIsLogged] = useState(false)

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={Theme}>
        <AuthContext.Provider
          value={{
            isLogged,
            setToken: (s) => {
              setIsLogged(true);
              setToken(s);
            }
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
ReactDOM.render(<Root history={customHistory} />, document.getElementById("root"));
