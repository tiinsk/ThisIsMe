import React from 'react';

import LanguageSelector from '../containers/language_selector';
import translate from '../../main/translate';
import Introduction from '../introduction';
import name from '../../../../assets/name_outline.svg';
import palms from '../../../../assets/palms.png';
import Navbar from "./navbar";

const Header = ({strings}) => {
  return(
    <div className="header">
     <Navbar/>
      <div className="header-content">
        <LanguageSelector/>
        <div className="titles">
          <img className="palms" src={palms} alt=""/>
          <div className="content-wrapper">
            <div className="corner top"/>
            <div>
              <div className="title">
                {strings.titles.hi}
              </div>
              <div className="name yellow-text">
                <img src={name} alt="Tiina Koskiranta"/>
              </div>
            </div>
            <div className="corner bottom"/>
          </div>
        </div>
        <div className="header-introduction">
          <Introduction />
        </div>
      </div>
    </div>
  )
};

export default translate(Header);
