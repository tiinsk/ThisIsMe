import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import background from '../../../assets/background.png';
import contacts from '../../../data/contacts';
import translate from '../../main/translate';
import LanguageSelector from '../containers/language_selector';
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
      color: ${({theme}) => theme.new.colors.white};
      font-family: ${({theme}) => theme.fonts.fontLato};
      font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
      font-size: ${({theme}) => theme.fontSizes.fontSizeXXXLarge};
      margin: ${({theme}) => theme.spaces.base(0.5)} 7rem;
      
      @media (max-width: ${({theme}) => theme.breakpoints.mdSize}){
        margin-left: 0;
        margin-right: 0;
      }
    }
    .name {
      color: ${({theme}) => theme.new.colors.white};
      font-family: ${({theme}) => theme.fonts.fontPTSerif};
      font-weight: ${({theme}) => theme.fontWeights.fontWeightBold};
      font-size: 9.2rem;
    }
    .subtitle {
      color: ${({theme}) => theme.new.colors.green};
      font-family: ${({theme}) => theme.fonts.fontOpenSans};
      font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};
      font-size: ${({theme}) => theme.fontSizes.fontSizeSmall};
      text-transform: uppercase;
      letter-spacing: 1.9px;
      text-align: center;
      margin: ${({theme}) => theme.spaces.base(0.5)} 7rem;
      
      @media (max-width: ${({theme}) => theme.breakpoints.mdSize}){
        text-align: left;
        margin-left: ${({theme}) => theme.spaces.base(0.25)};
        margin-right: ${({theme}) => theme.spaces.base(0.25)};
      }
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
  @media (max-width: ${({theme}) => theme.breakpoints.breakpointMobile}){
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
            <a className="link-anchor" href={contacts.github} target="_blank">
              <FontAwesomeIcon icon={faGithub}/>
            </a>
            <HoverBubble text={contacts.github} href={contacts.github} target="_blank"/>
          </div>
          <div className="link">
            <a className="link-anchor"  href={contacts.linkedin} target="_blank">
              <FontAwesomeIcon icon={faLinkedin}/>
            </a>
            <HoverBubble text={contacts.linkedin} href={contacts.linkedin} target="_blank"/>
          </div>
          <div className="link">
            <a className="link-anchor" href={`mailto:${contacts.email}`} >
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
