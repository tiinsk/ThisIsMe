import React from 'react';

import translate from '../main/translate';
import AboutMe from './about-me';
import Education from './education';
import Interests from './interests';
import Header from './presentational/header';
import Projects from './projects';
import Skills from './skills';
import WorkHistory from './work-history';

const SCROLL_OFFSET = 50;

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.scrollRefs = {
      aboutMe: React.createRef(),
      workHistory: React.createRef(),
      education: React.createRef(),
      skills: React.createRef(),
      projects: React.createRef(),
      interests: React.createRef(),
    };
  }

  onScrollToRef(section) {
    window.scrollTo({
      top: this.scrollRefs[section].current.offsetTop - SCROLL_OFFSET,
      left: 0,
      behavior: 'smooth'
    });
  }

  render() {
    return (
      <div>
        <Header header={this.props.data.header} contacts={this.props.data.contacts} onScrollToRef={(section) => this.onScrollToRef(section)}/>
        <div>
          <AboutMe aboutMe={this.props.data.aboutMe} contacts={this.props.data.contacts} scrollRef={this.scrollRefs.aboutMe}/>
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

export default translate(Home);
