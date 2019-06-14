import React from 'react';

import LanguageSelector from '../containers/language_selector';
import translate from '../../main/translate';
import Introduction from '../introduction';
import nameFirst from '../../../../assets/name_outline_first.svg';
import nameLast from '../../../../assets/name_outline_last.svg';
import palms from '../../../../assets/palms.jpg';
import Navbar from "./navbar";
import contacts from '../../../data/contacts';
import HoverBubble from "./hover_bubble";

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
                <div className="links">
                  <a className="link" href={contacts.github} target="_blank">
                    <i className="fa fa-github"/>
                    <HoverBubble text={contacts.github}/>
                  </a>
                  <a className="link"  href={contacts.linkedin} target="_blank">
                    <i className="fa fa-linkedin"/>
                    <HoverBubble text={contacts.linkedin}/>
                  </a>
                  <a className="link" href={`mailto:${contacts.email}`} >
                    <span>@</span>
                    <HoverBubble text={contacts.email}/>
                  </a>
                  <a className="link" href={`tel:${contacts.phone}`}>
                    <i className="material-icons">phone</i>
                    <HoverBubble text={contacts.phone}/>
                  </a>
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
