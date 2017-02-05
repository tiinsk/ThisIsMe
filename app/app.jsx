import React from 'react';
import Header from './components/containers/header.jsx';
import Introduction from './components/introduction.jsx';

import WorkHistory from './components/work_history.jsx';
import Education from './components/education.jsx';
import Skills from './components/skills.jsx';
import Interests from './components/interests.jsx';
import Contacts from './components/contacts.jsx';

const SM_WINDOW_LIMIT = 799;
const XS_WINDOW_LIMIT = 499;


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      windowWidth: "MD"
    };
  }

  updateDimensions() {
      const isExtraSmallWindow= window.innerWidth <= XS_WINDOW_LIMIT;
      const isSmallWindow= window.innerWidth <= SM_WINDOW_LIMIT;

    this.setState({
      windowWidth: isExtraSmallWindow ? "XS" : isSmallWindow ? "SM" : "MD"
    });
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", () => this.updateDimensions());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.updateDimensions());
  }

  render() {
    return (
      <div>
        <Header />
        <Introduction />
        <Education/>
        <WorkHistory
          windowWidth={this.state.windowWidth}
        />

        {/*<CourseWork/>*/}
        <Skills
          windowWidth={this.state.windowWidth}
        />
        <Interests/>
        <Contacts/>
      </div>
    );
  }
}

export default App;
