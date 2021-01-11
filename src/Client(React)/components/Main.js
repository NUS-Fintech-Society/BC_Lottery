
import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Overview from './Overview/Overview.js';
import history from './Navbar/history';
import Account from './Account/Account2';
import Trial from './TrialDesign/TrialDesign';
import Gameplay from './Overview/Gameplay/Gameplay.js';

const Main = () => (
  <div>
     <Router history={history}>
    <Switch>
      <Route path='/Overview' component={Overview} />
      <Route path='/Gameplay' component={Gameplay} />
      <Route path='/' component={Account} />

    </Switch>
    </Router>
  </div>
)

export default Main;