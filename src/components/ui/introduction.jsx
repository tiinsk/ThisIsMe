import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components/macro';

import cv_en_pdf from '../../assets/resume-EN.pdf';
import cv_fi_pdf from '../../assets/resume-FI.pdf';
import {Paragraph} from '../../theme/fonts';
import {LinkButton} from './presentational/button';
import { GatsbyImage } from 'gatsby-plugin-image';

const ImageSize = '180px';

const StyledIntroduction = styled.div`
  position: relative;
  display: flex;
  max-width: 860px;

  .summary {
    .summary-text {
      margin-top: 0;
      margin-bottom: ${({theme}) => theme.spaces.base(1)};
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
        <Paragraph className="summary-text">{aboutMe.body}</Paragraph>
        <div className="links">
          <div className="link">
            <a className="link-anchor" href={contacts.githubLink} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub}/>
              <span>{contacts.githubName}</span>
            </a>
          </div>
          <div className="link">
            <a className="link-anchor" href={contacts.linkedinLink} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin}/>
              <span>{contacts.linkedinName}</span>
            </a>
          </div>
          <div className="link">
            <a className="link-anchor" href={`mailto:${contacts.emailLink}`}>
              <span className="icon">@</span>
              <span>{contacts.emailLink}</span>
            </a>
          </div>
          <div className="link">
            <a className="link-anchor" href={`tel:${contacts.phoneLink}`}>
              <i className="material-icons">phone</i>
              <span>{contacts.phoneLink}</span>
            </a>
          </div>
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

