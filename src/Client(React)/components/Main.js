import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Overview from './Overview/Overview.js';

import Account from './Account/Account';
import Trial from './TrialDesign/TrialDesign';
import Gameplay from './Gameplay/Gameplay';

const Main = () => (
  <div>
    <Switch>
      <Route path='/Overview' component={Overview} />
      <Route path='/' component={Account} />
      <Route path='/Trial' component={Trial} />
      <Route path ='/Gameplay' component={Gameplay}/>

    </Switch>
  </div>
)

export default Main;