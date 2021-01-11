
import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Overview from './Overview/Overview.js';
import history from './Navbar/history';
import Account from './Account/Account';
import Trial from './TrialDesign/TrialDesign';
import Gameplay from './Gameplay/Gameplay';

const Main = () => (
  <div>
     <Router history={history}>
    <Switch>
      <Route path='/Overview' component={Overview} />
      <Route path='/Gagemeplay' component={Gameplay} />
      <Route path='/' component={Account} />

    </Switch>
    </Router>
  </div>
)

export default Main;