import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Overview from './Overview.js';

import Account from './Account.js';


const Main = () => (
  <div>
    <Switch>
      <Route path='/Overview' component={Overview} />
      <Route path='/Account' component={Account} />

    </Switch>
  </div>
)

export default Main;