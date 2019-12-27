import React, {createContext, useState} from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
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


interface HistoryProps {
  history: any
}

export const QueryContext = createContext({} as QueryInterface);

const Root = (props: HistoryProps) =>{

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
                <Artist id={match.params.id} goBack={() => history.push('/')}/>
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


const customHistory = createBrowserHistory();
ReactDOM.render(<Root  history={customHistory}/>, document.getElementById("root"));
