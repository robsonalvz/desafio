import React from 'react';
import { Switch, Router, Route } from "react-router-dom";
import Home from '../pages/Home';
import history from './history';
const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/" component={()=> <h1>404</h1>}  />
      </Switch>
    </Router>
  );
};

export default Routes;