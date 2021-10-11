import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import Artist from "./containers/Artist";
import Login from "./containers/Login";
import Main from "./containers/Main";

interface QueryInterface {
  lastQuery: string;
  setQuery: (url: string) => void;
}

export const QueryContext = createContext({} as QueryInterface);

interface RouteInfo {
  id: string;
}

export const Routes: React.FC = () => {
  const [lastQuery, setLastQuery] = useState("");
  const setLastQueryStr = (url: string) => {
    setLastQuery(url);
  };
  return (
    <Router>
      <Switch>
        <QueryContext.Provider
          value={{ lastQuery: lastQuery, setQuery: setLastQueryStr }}
        >
          <Route
            path="/artist/:id"
            render={({ match, history }: RouteComponentProps<RouteInfo>) => (
              <Artist
                history={history}
                id={match.params.id}
                goBack={() => history.push("/")}
              />
            )}
          />
          <Route exact={true} path="/login/" component={Login} />
          <Route exact={true} path="/" component={Main} />
        </QueryContext.Provider>
      </Switch>
    </Router>
  );
};
