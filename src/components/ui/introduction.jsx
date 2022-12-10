import React from 'react';
import styled from 'styled-components/macro';

import cv_en_pdf from '../../assets/resume-EN.pdf';
import cv_fi_pdf from '../../assets/resume-FI.pdf';
import {ParagraphStyle} from '../../theme/fonts';
import {LinkButton} from './presentational/button';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Github } from '../icons/github';
import { Linkedin } from '../icons/linkedin';
import { Icon } from '../icons';

const ImageSize = '180px';

const StyledIntroduction = styled.div`
  position: relative;
  display: flex;
  max-width: 860px;

  .summary {
    .summary-text {
      margin-top: 0;
      margin-bottom: ${({theme}) => theme.spaces.base(1)};
      p {
        ${ParagraphStyle};
      }
    }
    
    .links {
      margin-top: ${({theme}) => theme.spaces.base(2)};
      margin-bottom: ${({theme}) => theme.spaces.base(1)};
      a { 
        display: inline-flex;
        align-items: center;
        letter-spacing: 2px;
        margin-bottom: ${({theme}) => theme.spaces.base(0.5)};
        
        &:hover span {
          text-decoration: underline;
        }
        
        svg {
          height: 20px;
          width: 20px;
          margin-right: ${({theme}) => theme.spaces.base(0.5)};
        }
        
        .icon, i {
          margin-right: ${({theme}) => theme.spaces.base(0.5)};
          text-decoration: none !important;
          display: inline-block;
          font-size: ${({theme}) => theme.fontSizes.fontSizeXXLarge};
          font-weight: bold;
        }
      }
    }
  }
  
  .image-wrapper {
    padding-left: ${({theme}) => theme.spaces.base(4)};
    
    @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
      padding-left: 0;
      margin-bottom: ${({theme}) => theme.spaces.baseSize};
    }
  }
  
  @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
    flex-direction: column-reverse;
  }
`;

const MyImage = styled(GatsbyImage)`
  width: ${ImageSize};
  height: ${ImageSize};
  border-radius: 50%;
  background-size: 200px;
  background-position: left top;
`

const Introduction = ({aboutMe, contacts}) => {
  return (
    <StyledIntroduction>
      <div className="summary">
        <div className="summary-text" dangerouslySetInnerHTML={{ __html: aboutMe.body }}/>
        <div className="links">
          {contacts.links.map((link) => (
            <div key={link.url} className="link">
              <a className="link-anchor" href={link.url} target={link.target} rel="noopener noreferrer">
                <Icon type={link.icon} size="2.2rem"/>
                <span>{link.title}</span>
              </a>
            </div>
          ))}
        </div>
        {/*<LinkButton
          target="_blank"
          href={language === 'fi' ? cv_fi_pdf : cv_en_pdf}
        >
          <i className="material-icons">print</i>
          {strings.summary.printBtn}
        </LinkButton>*/}
      </div>
      <div className="image-wrapper">
        <MyImage image={aboutMe.image.gatsbyImageData} alt={aboutMe.image.alt}/>
      </div>
    </StyledIntroduction>
  )
};


export default Introduction;

