import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import translate from '../../components/main/translate';
import cv_en_pdf from '../../../assets/cv_en.pdf';
import cv_fi_pdf from '../../../assets/cv_fi.pdf';
import myImage from '../../../assets/me_2_0_black.png';

const ImageSize = '115px';

const StyledIntroduction = styled.div`
  position: relative;

  margin: ${({theme}) => theme.spaces.base(2)} ${({theme}) => theme.spaces.base(2)} ${({theme}) => theme.spaces.base(2)} ${({theme}) => theme.spaces.baseSize};
  max-width: 550px;

  .summary {
    .summary-title {
      display: inline-block;

      font-family: ${({theme}) => theme.fonts.fontQuicksand};
      color: ${({theme}) => theme.colors.blueNEW};
      font-weight: ${({theme}) => theme.fontWeights.fontWeightMedium};
      font-size: ${({theme}) => theme.fontSizes.fontSizeLarge};

      margin: ${({theme}) => theme.spaces.baseSize} 0;
      padding-right: ${({theme}) => theme.spaces.base(2)};

      border-bottom: 2px solid ${({theme}) => theme.colors.blueNEW};
    }
    .summary-text {
      font-family: ${({theme}) => theme.fonts.fontOpenSans};
      font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
      margin: ${({theme}) => theme.spaces.baseSize} 0 ${({theme}) => theme.spaces.base(2)} 0;
    }
    .summary-btn {
      font-family: ${({theme}) => theme.fonts.fontLato};
      font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
      font-weight: ${({theme}) => theme.fontWeights.fontWeightBold};
      text-transform: uppercase;
      color: ${({theme}) => theme.colors.blueNEW};
      background: white;
      text-decoration: none;

      border: 2px solid  ${({theme}) => theme.colors.blueNEW};
      padding: ${({theme}) => theme.spaces.base(0.5)} ${({theme}) => theme.spaces.baseSize};

      user-select: none;

      cursor: pointer;

      &:hover {
        background: ${({theme}) => theme.colors.blueHoverBtn};
      }
    }
   }
  .image-wrapper {
    padding: 10px;

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
        <div className="image-wrapper">
          <div className="own-image"/>
        </div>
        <div className="summary">
          <div className="summary-title">{strings.summary.title}</div>
          <div className="summary-text" dangerouslySetInnerHTML={{__html: strings.introduction}}/>
          <a
            className="summary-btn"
            target="_blank"
            href={language === "fi" ? cv_fi_pdf : cv_en_pdf}
          >
            {strings.summary.printBtn}
          </a>
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

