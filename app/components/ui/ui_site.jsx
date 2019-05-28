import React from 'react';
import Header from './presentational/header';

import WorkHistory from './work_history';
import Education from './education';
import Skills from './skills';
import Interests from './interests';
import Contacts from './contacts';
import Projects from './projects';

import translate from '../main/translate';

class UISite extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Header/>
        <div>
          <WorkHistory/>
          <Education/>
          <Skills/>
          <Projects/>
          <Interests/>
          <Contacts/>
        </div>
      </div>
    );
  }
}

export default translate(UISite);
