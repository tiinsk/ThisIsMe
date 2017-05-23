import React from 'react';
import Header from '../presentational/header';
import Introduction from '../introduction';

import WorkHistory from '../work_history';
import Education from '../education';
import Skills from '../skills';
import Interests from '../interests';
import Contacts from '../contacts';
import Projects from '../projects';

import translate from '../../../translate';

class UISite extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      windowWidth: "MD"
    };
    this.setOpacity = this.setOpacity.bind(this);
  }

  setOpacity(){
    let scrollPosition = window.scrollY;
    if(scrollPosition < 1000){
      this.setState({
        opacity: (scrollPosition/1000)
      });
    }
    else if(scrollPosition > 1000){
      this.setState({
        opacity: 1
      })
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.setOpacity);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.setOpacity);
  }

  render() {
    return (
      <div>
        <Header/>
        <div>
          <Introduction />
          <Education/>
          <WorkHistory/>
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
