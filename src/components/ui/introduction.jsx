import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';

import translate from '../../components/main/translate';
import cv_en_pdf from '../../assets/cv_en.pdf';
import cv_fi_pdf from '../../assets/cv_fi.pdf';
import myImage from '../../assets/me_2_0_black.png';
import {LinkButton} from './presentational/button';
import contacts from '../../data/contacts';

const ImageSize = '115px';

const StyledIntroduction = styled.div`
  position: relative;
  display: flex;
  max-width: 550px;

  .summary {
    .summary-title {
      display: inline-block;

      font-family: ${({theme}) => theme.fonts.fontQuicksand};
      color: ${({theme}) => theme.colors.blueNEW};
      font-weight: ${({theme}) => theme.fontWeights.fontWeightMedium};
      font-size: ${({theme}) => theme.fontSizes.fontSizeLarge};

      margin-bottom: ${({theme}) => theme.spaces.baseSize};
      padding-right: ${({theme}) => theme.spaces.base(2)};

      border-bottom: 2px solid ${({theme}) => theme.colors.blueNEW};
    }
    .summary-text {
      font-family: ${({theme}) => theme.fonts.fontOpenSans};
      font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
      margin-bottom: ${({theme}) => theme.spaces.base(2)};
    }
    
    .links {
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
    padding-left: ${({theme}) => theme.spaces.baseSize};

    .own-image {
      background-image: url(${myImage});
      width: ${ImageSize};
      height: ${ImageSize};
      border-radius: 50%;
      background-size: 126px;
      background-position: left top;
    }
  }
  
  @media (max-width: ${({theme}) => theme.breakpoints.lgSize}) {
    margin: 0;
  }
`;

const Introduction = ({strings, language}) => {
  return (
      <StyledIntroduction>
        <div className="summary">
          <div className="summary-text" dangerouslySetInnerHTML={{__html: strings.introduction}}/>
          <div className="links">
            <div className="link">
              <a className="link-anchor" href={contacts.github} target="_blank">
                <FontAwesomeIcon icon={faGithub}/>
                <span>{contacts.github}</span>
              </a>
            </div>
            <div className="link">
              <a className="link-anchor"  href={contacts.linkedin} target="_blank">
                <FontAwesomeIcon icon={faLinkedin}/>
                <span>{contacts.linkedin}</span>
              </a>
            </div>
            <div className="link">
              <a className="link-anchor" href={`mailto:${contacts.email}`} >
                <span className="icon">@</span>
                <span>{contacts.email}</span>
              </a>
            </div>
            <div className="link">
              <a className="link-anchor" href={`tel:${contacts.phone}`}>
                <i className="material-icons">phone</i>
                <span>{contacts.phone}</span>
              </a>
            </div>
          </div>
          <LinkButton
            target="_blank"
            href={language === "fi" ? cv_fi_pdf : cv_en_pdf}
          >
            <i className="material-icons">print</i>
            {strings.summary.printBtn}
          </LinkButton>
        </div>
        <div className="image-wrapper">
          <div className="own-image"/>
        </div>
      </StyledIntroduction>
  )
};


function mapStateToProps({language}) {
  return {
    language: language.language
  }
}

export default  connect(mapStateToProps, null)(translate(Introduction));

