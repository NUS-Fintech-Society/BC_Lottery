import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Overview from './Overview/Overview.js';

import Account from './Account/Account';

const Main = () => (
  <div>
    <Switch>
      <Route path='/Account' component={Account} />
      <Route path='/' component={Overview} />
     
    </Switch>
  </div>
)

export default Main;