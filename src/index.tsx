import React, {createContext, useState} from "react";
import ReactDOM from "react-dom";
import Main from "./containers/Main";
import Artist from './containers/Artist';

import { ThemeProvider } from "styled-components";
import { Theme, GlobalStyle } from "./theme";
import { Route, Switch } from 'react-router-dom';
import { HashRouter as Router, RouteComponentProps } from 'react-router-dom';

require("dotenv").config();


interface RouteInfo {
  id: string;
}

interface QueryInterface {
  lastQuery: string;
  setQuery: (url: string) => void;
}


export const QueryContext = createContext({} as QueryInterface);

const Root = () =>{
const [lastQuery, setLastQuery] = useState('');
const setLastQueryStr = (url: string) => {
    setLastQuery(url);
}

 return(
    <ThemeProvider theme={Theme}>
      <>
        <Router>
          <Switch>
            <QueryContext.Provider value={{lastQuery: lastQuery, setQuery: setLastQueryStr}}>
              <Route path='/artist/:id' render={({match, history}: RouteComponentProps<RouteInfo>) => (            
                <Artist id={match.params.id} goBack={() => history.goBack()}/>
              )}/>
              <Route exact={true} path='/' component={Main} />
            </QueryContext.Provider>
          </Switch>
        </Router>
        <GlobalStyle />
      </>
    </ThemeProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
