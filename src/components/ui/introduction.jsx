import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components/macro';

import cv_en_pdf from '../../assets/resume-EN.pdf';
import cv_fi_pdf from '../../assets/resume-FI.pdf';
import myImage from '../../assets/me_2_0_black.png';
import translate from '../../components/main/translate';
import contacts from '../../data/contacts';
import {Paragraph} from '../../theme/fonts';
import {LinkButton} from './presentational/button';

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

    .own-image {
      background-image: url(${myImage});
      width: ${ImageSize};
      height: ${ImageSize};
      border-radius: 50%;
      background-size: 200px;
      background-position: left top;
    }
  }
  
  @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
    flex-direction: column-reverse;
  }
`;

const Introduction = ({strings, language}) => {
  return (
    <StyledIntroduction>
      <div className="summary">
        <Paragraph className="summary-text">{strings.introduction}</Paragraph>
        <Paragraph className="summary-text">{strings.introduction2}</Paragraph>
        <Paragraph className="summary-text">{strings.introduction3}</Paragraph>
        <div className="links">
          <div className="link">
            <a className="link-anchor" href={contacts.github} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub}/>
              <span>{strings.contacts.github}</span>
            </a>
          </div>
          <div className="link">
            <a className="link-anchor" href={contacts.linkedin} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin}/>
              <span>{strings.contacts.linkedin}</span>
            </a>
          </div>
          <div className="link">
            <a className="link-anchor" href={`mailto:${contacts.email}`}>
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
        {/*<LinkButton
          target="_blank"
          href={language === 'fi' ? cv_fi_pdf : cv_en_pdf}
        >
          <i className="material-icons">print</i>
          {strings.summary.printBtn}
        </LinkButton>*/}
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

export default connect(mapStateToProps, null)(translate(Introduction));

