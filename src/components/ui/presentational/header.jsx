import React from 'react';

import LanguageSelector from '../containers/language_selector';
import translate from '../../main/translate';
import Introduction from '../introduction';
import nameFirst from '../../../assets/name_outline_first.svg';
import nameLast from '../../../assets/name_outline_last.svg';
import palms from '../../../assets/palms.jpg';
import Navbar from "./navbar";
import contacts from '../../../data/contacts';
import HoverBubble from "./hover_bubble";
import styled from 'styled-components/macro';

const StyledHeader = styled.div`
  height: 100vh;
  min-height: 885px;

  .header-content {
    width: 100%;
    overflow: hidden;
    position: relative;
    top: 0;
    margin-bottom: ${({theme}) => theme.spaces.baseSize};

    min-height: 775px;
    height: calc(100vh - #{${({theme}) => theme.navBarHeight}} - #{${({theme}) => theme.spaces.baseSize}});

    display: flex;
    align-items: stretch;

    .left-side-wrapper {
      display: flex;
      max-width: 60%;
      .titles {
        display: flex;
        align-items: center;
        justify-content: center;

        padding: ${({theme}) => theme.spaces.baseSize};

        position: relative;
        overflow: hidden;

        .palms-container {
          max-width: 100%;
          overflow: hidden;
          height: 100%;
          display: flex;
          justify-content: flex-end;

          .palms {
            width: auto;
            min-height: 725px;
            height: calc(100vh - #{${({theme}) => theme.navBarHeight}} - #{${({theme}) => theme.spaces.baseSize}*3});
          }
        }

        .links {
          display: flex;
          justify-content: flex-end;

          .link {
            margin-left: ${({theme}) => theme.spaces.baseSize}/4;

            position: relative;

            background: url("../assets/button_border.svg");
            background-size: cover;
            height: 35px;
            width: 35px;

            display: flex;
            justify-content: center;
            align-items: center;

            color: rgba(white, 0.75);
            font-size: 1.7rem;
            font-family: ${({theme}) => theme.fonts.fontLato};
            font-weight: ${({theme}) => theme.fontWeights.fontWeightBold};

            cursor: pointer;

            text-decoration: none;

            &:hover {
              color: white;
              background: url("../assets/button_border_hover.svg");
              .hover-bubble {
                display: initial;
              }
            }

            .material-icons {
              font-size: 1.7rem;
            }
          }
        }

        .corner {
          position: absolute;

          height: 85px;
          width: 85px;

          &.top {
            top: 0;
            left: 0;
            border-left: 7px solid ${({theme}) => theme.colors.greenNEW};
            border-top: 7px solid ${({theme}) => theme.colors.greenNEW};
          }

          &.bottom {
            bottom: 0;
            right: 0;
            border-right: 7px solid ${({theme}) => theme.colors.greenNEW};
            border-bottom: 7px solid ${({theme}) => theme.colors.greenNEW};
          }
        }
      }
      .content-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;


        font-family: ${({theme}) => theme.fonts.fontLato};
        font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
        .name-titles {
          margin: ${({theme}) => theme.spaces.baseSize}*2;
          .title {
            font-size: 20px;
            color: white;

            @media (max-width: ${({theme}) => theme.breakpoints.xsSize}) {
              font-size: 1.5rem;
            }
          }
          .name {
            font-size: 40px;
          }
        }
      }
    }
    .header-introduction {
      display: flex;
      align-items: flex-start;
      flex-grow: 1;
      justify-content: center;
    }
  }
  @media (max-width: ${({theme}) => theme.breakpoints.breakpointSmallWindow}){
    height: initial;
    min-height: initial;
    margin-bottom: -8rem;

    .header-content {
      flex-wrap: wrap;
      height: initial;
      margin-bottom: 0;

      .left-side-wrapper {
        max-width: initial;
        width: 100%;
        height: calc(100vh - #{${({theme}) => theme.navBarHeight}} - #{${({theme}) => theme.spaces.baseSize}});
        .titles {
          flex-grow: 1;
          margin-right: ${({theme}) => theme.spaces.baseSize}*2;
          .palms-container .palms {
            width: 100%;
          }
        }
      }
      .header-introduction {
        display: none;
      }
    }
  }
  @media (max-width: ${({theme}) => theme.breakpoints.breakpointMobile}){
    .header-content {
      .left-side-wrapper {
        .titles {
          margin-right: 0;

          .palms-container {
            .palms {
              width: auto;
            }
          }
        }
      }
    }
  }
`;

const Header = ({strings, onScrollToRef}) => {
  return (
    <StyledHeader>
      <Navbar onScrollToRef={onScrollToRef}/>
      <div className="header-content">
        <div className="left-side-wrapper">
          <LanguageSelector/>
          <div className="titles">
            <div className="palms-container">
              <img className="palms" src={palms} alt=""/>
            </div>
            <div className="content-wrapper">
              <div className="corner top"/>
              <div className="name-titles">
                <div className="title">
                  {strings.titles.introduction}
                </div>
                <div className="name">
                  <img src={nameFirst} alt="Tiina" style={{marginRight: "10px"}}/>
                  <img src={nameLast} alt="Koskiranta"/>
                </div>
                <div className="links">
                  <a className="link" href={contacts.github} target="_blank">
                    <i className="fa fa-github"/>
                    <HoverBubble text={contacts.github}/>
                  </a>
                  <a className="link"  href={contacts.linkedin} target="_blank">
                    <i className="fa fa-linkedin"/>
                    <HoverBubble text={contacts.linkedin}/>
                  </a>
                  <a className="link" href={`mailto:${contacts.email}`} >
                    <span>@</span>
                    <HoverBubble text={contacts.email}/>
                  </a>
                  <a className="link" href={`tel:${contacts.phone}`}>
                    <i className="material-icons">phone</i>
                    <HoverBubble text={contacts.phone}/>
                  </a>
                </div>
              </div>
              <div className="corner bottom"/>
            </div>
          </div>
        </div>
        <div className="header-introduction">
          <Introduction/>
        </div>
      </div>
    </StyledHeader>
  )
};

export default translate(Header);
