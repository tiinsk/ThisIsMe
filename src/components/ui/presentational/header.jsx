import React from 'react';
import styled from 'styled-components/macro';
import {GatsbyImage} from 'gatsby-plugin-image';

import {PageName, PageSubtitle, PageTitle} from '../../../theme/fonts';
import LanguageSelector from '../containers/language-selector';
import {StyledHoverBubble} from './hover-bubble';
import Navbar from './navbar';
import { Icon } from '../../icons';

const StyledHeader = styled.div`
  width: calc(100vw - ${({theme}) => theme.rightMenuWidth});
  height: 100vh;
  
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
    background: ${({theme}) => theme.UI.colors.white};
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

const HeaderImg = styled(GatsbyImage)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  img {
    object-position: ${({ $posX, $posY }) => `${$posX * 100}% ${$posY * 100}%`};
  }
`

const Header = ({onScrollToRef, contacts, header}) => {
  return (
    <StyledHeader>
      <HeaderImg
        image={header.image.gatsbyImageData}
        $posX={header.image.focalPoint.x}
        $posY={header.image.focalPoint.y}
        alt={header.image.alt}
      />
      <Navbar header={header} onScrollToRef={onScrollToRef}/>
      <div className="name-titles">
        <div className="title">
          {header.title}
        </div>
        <div className="name">
          {header.name}
        </div>
        <div className="subtitle">
          {header.subtitle}
        </div>
      </div>
      <div className="right-menu">
        <div className="links">
          {contacts.links.map((link) => (
            <div key={link.url} className="link">
              <a className="link-anchor" href={link.url} target={link.target} rel="noopener noreferrer">
                <Icon type={link.icon}/>
              </a>
            </div>
          ))}
        </div>
        <LanguageSelector/>
      </div>
    </StyledHeader>
  )
};

export default Header;
