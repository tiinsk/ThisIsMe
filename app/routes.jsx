import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router-dom';
import Home from './components/ui/containers/home';
import UISite from './components/ui/containers/ui_site';
import ConsoleSite from './components/console/console_site';

export default (store) => {
  return (
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/cv" component={UISite}/>
      <Route path="/console" component={ConsoleSite}/>
    </div>
  );
};
