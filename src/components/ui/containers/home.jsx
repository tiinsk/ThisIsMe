import React from 'react';
import { connect } from 'react-redux';

import {
  Link
} from 'react-router-dom'

import cv_en_pdf from '../../../assets/cv_en.pdf';
import cv_fi_pdf from '../../../assets/cv_fi.pdf';

import translate from '../../main/translate';
import LanguageSelectorSmall from "./language_selector_small";
import styled from 'styled-components/macro';

const HeaderHight = '70px';

const StyledHome = styled.div`
  .home-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: ${HeaderHight};

    .title {
      color: ${({theme}) => theme.colors.black};
      font-size: ${({theme}) => theme.fontSizes.fontSizeXXLarge};
      font-family: ${({theme}) => theme.fonts.fontLato};
      font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
      text-transform: uppercase;

      margin-left: ${({theme}) => theme.spaces.baseSize};
    }

    .language-selector-small {
      left: initial;
      position: relative;
      white-space: nowrap;
    }
  }

  .content-wrapper {
    display: flex;
    height: calc(100vh - ${HeaderHight});
    overflow: hidden;

    padding: 0 ${({theme}) => theme.spaces.baseSize} ${({theme}) => theme.spaces.baseSize}*2 ${({theme}) => theme.spaces.baseSize};

    .ui-header {
      flex: 0 1 auto;
      width: 50%;

      margin-right: ${({theme}) => theme.spaces.baseSize}/4;

      transition: width 0.5s ease-out;

      background-color: black;
      background-image: url("../assets/palms_large.jpg");

      background-size: cover;
      background-position: 75% top;
      overflow: hidden;
      top: 0;
      position: relative;
      .overlay {
        position: absolute;
        height: 100%;
        width: 100%;
        background: rgba(13, 11, 48, 0.55);
        z-index: 0;
      }

      &:hover {
        width: 60%;
      }
    }
    .console-header {
      flex: 0 1 auto;
      width: 50%;

      margin-left: ${({theme}) => theme.spaces.baseSize}/4;

      transition: width 0.5s ease-out;

      background: ${({theme}) => theme.colors.almostBlack};
      position: relative;
      .cursor {
        font-size: 3rem;
        padding: ${({theme}) => theme.spaces.baseSize}/2 ${({theme}) => theme.spaces.baseSize};
        color: ${({theme}) => theme.colors.green}
        .blinking-underline {
          animation: blinker 1.5s steps(1, start) infinite;
        }
      }

      &:hover {
        width: 60%;
      }

      @-webkit-keyframes blinker {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    }
    .choose-btn {
      position: absolute;
      color: white;
      top: 50%;

      transform: translate(-50%, -50%);
      text-align: center;
      padding: ${({theme}) => theme.spaces.baseSize}/2;
      width: 18rem;

      font-size: ${({theme}) => theme.fontSizes.fontSizeLarge};
      cursor: pointer;
      text-decoration: none;
      left: 50%;

      text-transform: uppercase;

      &.ui-btn {
        background: ${({theme}) => theme.colors.blueNEW};

        font-family: ${({theme}) => theme.fonts.fontLato};
        font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};

        &:hover {
          background: darken(${({theme}) => theme.colors.blueNEW}, 5%);
        }
      }
      &.console-btn {
        background: $${({theme}) => theme.colors.greenConsoleBtn};
        font-family: ${({theme}) => theme.fonts.fontSpaceMono};
        &:hover {
          background: darken($${({theme}) => theme.colors.greenConsoleBtn}, 10%);
        }
      }
    }
    .cv-link {
      position: absolute;
      color: ${({theme}) => theme.colors.black};
      bottom: 10px;
      text-decoration: none;
      padding: 0.5rem 0.5rem;
      cursor: pointer;
      font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
    }

    @media (max-width: ${({theme}) => theme.breakpoints.smSize}) {
      flex-direction: column;

      .ui-header {
        width: 100%;
        height: 50%;
        transition: height 0.5s ease-out;

        margin-right: 0;
        margin-bottom: ${({theme}) => theme.spaces.baseSize}/4;

        &:hover {
          height: 60%;
          width: 100%;
        }
      }
      .console-header {
        width: 100%;
        height: 50%;
        transition: height 0.5s ease-out;

        margin-left: 0;
        margin-top: ${({theme}) => theme.spaces.baseSize}/4;

        &:hover {
          height: 60%;
          width: 100%;
        }
      }
    }
  }
  @media (max-width: ${({theme}) => theme.breakpoints.smSize}) {
    .home-header {
      .title {
        font-size: ${({theme}) => theme.fontSizes.fontSizeLarge};
      }
      .language-selector-small {
        .lang {
          font-size: ${({theme}) => theme.fontSizes.fontSizeSmall};
        }
      }
    }
  }
`;

class Home extends React.Component {

  render() {
    return (
      <StyledHome>
        <div className="home-header">
          <div className="title">{this.props.strings.chooseSide}</div>
          <LanguageSelectorSmall/>
        </div>
        <div className="content-wrapper">
          <div className="ui-header">
            <Link className="choose-btn ui-btn" to="/ui" >
              {this.props.strings.useUI}
            </Link>
          </div>
          <div className="console-header">
            <div className="cursor">
              <i className="fa fa-angle-right"/>
              <span style={{marginLeft: "0.5rem"}} className="blinking-underline">_</span>
            </div>
            <Link className="choose-btn console-btn" to="/console" >
              {this.props.strings.useConsole}
            </Link>
          </div>
          <a className="cv-link" target="_blank" href={this.props.language == "fi" ? cv_fi_pdf : cv_en_pdf}>{this.props.strings.downloadPDF}</a>
        </div>
      </StyledHome>
    );
  }
}

function mapStateToProps({language}) {
  return {
    language: language.language
  }
}

export default  connect(mapStateToProps, null)(translate(Home));
