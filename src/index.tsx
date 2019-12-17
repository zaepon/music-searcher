import React from "react";
import ReactDOM from "react-dom";
import Main from "./containers/Main";
import Artist from './containers/Artist';

import { ThemeProvider } from "styled-components";
import { Theme, GlobalStyle } from "./theme";
import { Route, Switch, Redirect } from 'react-router-dom';
import { HashRouter as Router, RouteProps, RouteComponentProps } from 'react-router-dom';

require("dotenv").config();


interface RouteInfo {
  id: string;
}


const Root = () => (
  <ThemeProvider theme={Theme}>
    <>
      <Router>
        <Switch>
          <Route path='/artist/:id' render={({match, history}: RouteComponentProps<RouteInfo>) => (            
            <Artist id={match.params.id} goBack={() => history.goBack()}/>
          )}/>
          <Route exact={true} path='/' component={Main} />
        </Switch>
      </Router>
      <GlobalStyle />
    </>
  </ThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
