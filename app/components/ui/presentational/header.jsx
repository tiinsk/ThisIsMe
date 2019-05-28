import React from 'react';
import {
  Link
} from 'react-router-dom'


import LanguageSelector from '../containers/language_selector';
import translate from '../../main/translate';

const Header = ({strings}) => {
  return(
    <div className="header">
      <div className="overlay"></div>
        <div className="titles">
          <div className="title">
            {strings.introductionHiThisIs} <span className="magenta-text">{strings.introductionMe}</span>
          </div>
          <div className="name">
            Tiina <span className="magenta-text">Koskiranta</span>
          </div>
        </div>
      <LanguageSelector/>
      <Link className="home-icon" to="/" >
        <i className="fa fa-th-large"/>
      </Link>
    </div>
  )
};

export default translate(Header);
