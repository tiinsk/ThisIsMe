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

  constructor(props) {
    super(props);
    this.scrollRefs = {
        description: React.createRef(),
        workHistory: React.createRef(),
        education: React.createRef(),
        skills: React.createRef(),
        projects: React.createRef(),
        interests: React.createRef(),
      };
  }

  onScrollToRef(section) {
    window.scrollTo({
      top: this.scrollRefs[section].current.offsetTop,
      left: 0,
      behavior: 'smooth'
    });
  }

  render() {
    return (
      <div>
        <Header onScrollToRef={(section) => this.onScrollToRef(section)}/>
        <div>
          <Description scrollRef={this.scrollRefs.description}/>
          <WorkHistory scrollRef={this.scrollRefs.workHistory}/>
          <Education scrollRef={this.scrollRefs.education}/>
          <Skills scrollRef={this.scrollRefs.skills}/>
          <Projects scrollRef={this.scrollRefs.projects}/>
          <Interests scrollRef={this.scrollRefs.interests}/>
        </div>
      </div>
    );
  }
}

export default translate(UISite);
