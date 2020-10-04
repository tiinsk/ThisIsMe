import React from 'react';
import {Route} from 'react-router-dom';

import Home from '../ui/home';
import ConsoleSite from '../console/console-site';

export default (store) => {
  return (
    <div style={{height: '100%'}}>
      <Route exact path="/" component={Home}/>
      <Route path="/console" component={ConsoleSite}/>
    </div>
  );
};
