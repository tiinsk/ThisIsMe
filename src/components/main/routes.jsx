import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router-dom';
import Home from '../ui/containers/home';
import UISite from '../ui/ui_site';
import ConsoleSite from '../console/console_site';

export default (store) => {
  return (
    <div style={{height: "100%"}}>
      <Route exact path="/" component={Home}/>
      <Route path="/ui" component={UISite}/>
      <Route path="/console" component={ConsoleSite}/>
    </div>
  );
};
