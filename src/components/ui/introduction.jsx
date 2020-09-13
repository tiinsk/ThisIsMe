import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';

import translate from '../../components/main/translate';
import cv_en_pdf from '../../assets/cv_en.pdf';
import cv_fi_pdf from '../../assets/cv_fi.pdf';
import myImage from '../../assets/me_2_0_black.png';
import {LinkButton} from './presentational/button';

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
  @media (max-width: ${({theme}) => theme.breakpoints.breakpointSmallWindow}) {
    margin: 0;
  }
`;

const Introduction = ({strings, language}) => {
  return (
      <StyledIntroduction>
        <div className="summary">
          <div className="summary-text" dangerouslySetInnerHTML={{__html: strings.introduction}}/>
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

