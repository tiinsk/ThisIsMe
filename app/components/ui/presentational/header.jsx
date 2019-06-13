import React from 'react';

import LanguageSelector from '../containers/language_selector';
import translate from '../../main/translate';
import Introduction from '../introduction';
import nameFirst from '../../../../assets/name_outline_first.svg';
import nameLast from '../../../../assets/name_outline_last.svg';
import palms from '../../../../assets/palms.jpg';
import Navbar from "./navbar";

const Header = ({strings, onScrollToRef}) => {
  return (
    <div className="header">
      <Navbar onScrollToRef={onScrollToRef}/>
      <div className="header-content">
        <div className="left-side-wrapper">
          <LanguageSelector/>
          <div className="titles">
            <div className="palms-container">
              <img className="palms" src={palms} alt=""/>
            </div>
            <div className="content-wrapper">
              <div className="corner top"/>
              <div className="name-titles">
                <div className="title">
                  {strings.titles.introduction}
                </div>
                <div className="name">
                  <img src={nameFirst} alt="Tiina" style={{marginRight: "10px"}}/>
                  <img src={nameLast} alt="Koskiranta"/>
                </div>
              </div>
              <div className="corner bottom"/>
            </div>
          </div>
        </div>
        <div className="header-introduction">
          <Introduction/>
        </div>
      </div>
    </div>
  )
};

export default translate(Header);
