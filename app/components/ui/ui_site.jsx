import React from 'react';
import Header from './presentational/header';

import WorkHistory from './work_history';
import Education from './education';
import Skills from './skills';
import Interests from './interests';
import Projects from './projects';

import translate from '../main/translate';
import Description from "./description";

class UISite extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Header/>
        <div>
          <Description/>
          <WorkHistory/>
          <Education/>
          <Skills/>
          <Projects/>
          <Interests/>
        </div>
      </div>
    );
  }
}

export default translate(UISite);
