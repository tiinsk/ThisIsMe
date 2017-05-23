import React from 'react';
import {
  Link
} from 'react-router-dom'

import translate from '../../../translate';
import Header from '../presentational/header';
import LanguageSelector from './language_selector';

class Home extends React.Component {

  render() {
    return (
      <div className="home">
        <LanguageSelector/>
        <div className="ui-header">
          <div className="overlay"></div>
          <Link className="choose-btn ui-btn" to="/cv" >
            {this.props.strings.useUI}
          </Link>
        </div>
        <div className="console-header">
          <div className="cursor">
            <i className="fa fa-angle-right"/>
            <span style={{marginLeft: "0.5rem"}} className="blinking-underline">_</span>
          </div>
          <Link className="choose-btn console-btn" to="/console" >
            {this.props.strings.useConsole}
          </Link>
        </div>
        <div className="title">{this.props.strings.chooseSide}</div>
      </div>
    );
  }
}

export default translate(Home);
