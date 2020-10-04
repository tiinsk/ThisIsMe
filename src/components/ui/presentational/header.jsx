import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components/macro';

import background from '../../../assets/background.png';
import contacts from '../../../data/contacts';
import {PageName, PageSubtitle, PageTitle} from '../../../theme/fonts';
import translate from '../../main/translate';
import LanguageSelector from '../containers/language-selector';
import HoverBubble, {StyledHoverBubble} from './hover-bubble';
import Navbar from './navbar';

const StyledHeader = styled.div`
  width: calc(100vw - ${({theme}) => theme.rightMenuWidth});
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  
  position: relative;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  .name-titles {
    display: flex;
    flex-direction: column;

    padding: ${({theme}) => theme.spaces.baseSize};

    position: relative;
    .title {
      ${PageTitle};
    }
    .name {
      ${PageName};
    }
    .subtitle {
      ${PageSubtitle};
    }
  }
  
  .right-menu {
    background: ${({theme}) => theme.new.colors.white};
    width: ${({theme}) => theme.rightMenuWidth};
    height: 100vh;
    
    position: absolute;
    top: 0;
    right: -${({theme}) => theme.rightMenuWidth};
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    
    .links {
      margin: ${({theme}) => theme.spaces.base(1)} 0;
    
      .link {
        position: relative;

        .link-anchor {
          display: block;
          
          padding: ${({theme}) => theme.spaces.baseSize};
        
          color: rgba(white, 0.75);
          font-size: 1.7rem;
          font-family: ${({theme}) => theme.fonts.fontLato};
          font-weight: ${({theme}) => theme.fontWeights.fontWeightBold};
  
          text-decoration: none;
  
          .material-icons {
            font-size: 1.7rem;
          }
        }
        
        :hover {
          ${StyledHoverBubble} {
            display: flex;
          }
        }
      }
    }
  }
  @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
    width: 100vw;
    .right-menu {
      display: none;
    }
  }
`;

const Header = ({strings, onScrollToRef}) => {
  return (
    <StyledHeader>
      <Navbar onScrollToRef={onScrollToRef}/>
      <div className="name-titles">
        <div className="title">
          {strings.titles.introduction}
        </div>
        <div className="name">
          {contacts.name}
        </div>
        <div className="subtitle">
          {strings.summary.title}
        </div>
      </div>
      <div className="right-menu">
        <div className="links">
          <div className="link">
            <a className="link-anchor" href={contacts.github} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub}/>
            </a>
            <HoverBubble text={contacts.github} href={contacts.github} target="_blank"/>
          </div>
          <div className="link">
            <a className="link-anchor" href={contacts.linkedin} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin}/>
            </a>
            <HoverBubble text={contacts.linkedin} href={contacts.linkedin} target="_blank" rel="noopener noreferrer"/>
          </div>
          <div className="link">
            <a className="link-anchor" href={`mailto:${contacts.email}`}>
              <span>@</span>
            </a>
            <HoverBubble text={contacts.email} href={`mailto:${contacts.email}`}/>
          </div>
          <div className="link">
            <a className="link-anchor" href={`tel:${contacts.phone}`}>
              <i className="material-icons">phone</i>
            </a>
            <HoverBubble text={contacts.phone} href={`tel:${contacts.phone}`}/>
          </div>
        </div>
        <LanguageSelector/>
      </div>
    </StyledHeader>
  )
};

export default translate(Header);
