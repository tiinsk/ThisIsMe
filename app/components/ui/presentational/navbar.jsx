import React from 'react';
import {
  Link
} from 'react-router-dom'

import translate from '../../main/translate';
import LanguageSelectorSmall from "../containers/language_selector_small";
import styled from 'styled-components';

const StyledNavbar = styled.nav`
 height: ${({theme}) => theme.navBarHeight};
  margin-left: ${({theme}) => theme.langSelectionWidth} + ${({theme}) => theme.spaces.baseSize};

  .nav-list {
    height: 100%;

    list-style-type: none;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0;
    margin: 0;

    .home-icon{
      padding: ${({theme}) => theme.spaces.baseSize};
      margin-right: ${({theme}) => theme.spaces.baseSize};

      display: flex;
      justify-content: center;
      align-items: center;

      text-decoration: none;

      cursor: pointer;

      .material-icons {
        color: ${({theme}) => theme.colors.black};
        font-size: ${({theme}) => theme.fontSizes.fontSizeXXLarge};
      }
    }

    .nav-item {
      font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
      text-transform: uppercase;
      font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};
      color: ${({theme}) => theme.colors.black};
      text-align: center;

      cursor: pointer;
    }

    &.nav-mobile {
      display: none;

      .home-icon{
        padding: ${({theme}) => theme.spaces.baseSize}/2;
        margin-bottom: -${({theme}) => theme.spaces.baseSize};
      }

      .mobile-nav-items {
        display: none;

        &.open {
          display: flex;
        }

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;

        background: ${({theme}) => theme.colors.almostBlack};

        flex-direction: column;
        justify-content: center;
        align-items: center;

        .nav-item {
          display: block;
          font-size: ${({theme}) => theme.fontSizes.fontSizeXLarge};
          margin-bottom: ${({theme}) => theme.spaces.baseSize};
          color: white;
        }

        .close {
          color: white;
          padding: ${({theme}) => theme.spaces.baseSize};
          position: absolute;
          top: 0;
          right: 0;

          cursor: pointer;

          font-size: ${({theme}) => theme.fontSizes.fontSizeXXXLarge};
        }
        .language-selector-small {
          .lang {
            color: $${({theme}) => theme.colors.greyLangSelection};
            border-color: $${({theme}) => theme.colors.greyLangSelection};
            &.selected {
              color: white;
            }
          }
        }
      }
    }
  }
  @media (max-width: ${({theme}) => theme.breakpoints.breakpointMobile}){
    height: ${({theme}) => theme.navBarHeight}-mobile;
    .nav-list {
      display: none;

      &.nav-mobile {
        display: flex;
      }

      justify-content: flex-end;

      .nav-item {
        display: none;
        a {
          display: block;
          color: white;
          text-decoration: none;
          padding-bottom: ${({theme}) => theme.spaces.baseSize};

          position: relative;
          
          &:after {
            content: '';
            height: 8px;
            width: 8px;
            background: $${({theme}) => theme.colors.greyLangSelection};
            margin: 0;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%) rotate(45deg);
          }
        }
      }
    }
  }
`;


class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openMenu: false
    }
  }
  toggleMenu () {
    if(this.state.openMenu) {
      document.body.classList.remove('mobile-menu-open');
    } else {
      document.body.classList.add('mobile-menu-open');
    }

    this.setState({
      openMenu: !this.state.openMenu
    })
  }

  onMobileNavItemClick(navItem) {
    this.toggleMenu();
    this.props.onScrollToRef(navItem);
  }


  render () {
    return (
      <StyledNavbar>
        <ul className="nav-list">
          <li
            className="nav-item"
            onClick={() => this.props.onScrollToRef('workHistory')}
          >
            {this.props.strings.titles.workHistory}
          </li>
          <li
            className="nav-item"
            onClick={() => this.props.onScrollToRef('education')}
          >
            {this.props.strings.titles.education}
          </li>
          <li
            className="nav-item"
            onClick={() => this.props.onScrollToRef('skills')}
          >
            {this.props.strings.titles.skills}
          </li>
          <li
            className="nav-item"
            onClick={() => this.props.onScrollToRef('projects')}
          >
            {this.props.strings.titles.projects}
          </li>
          <li
            className="nav-item"
            onClick={() => this.props.onScrollToRef('interests')}
          >
            {this.props.strings.titles.interests}
          </li>
          <li>
            <Link className="home-icon" to="/">
              <i className="material-icons">menu</i>
            </Link>
          </li>
        </ul>
        <div className="nav-list nav-mobile">
          <div className={`mobile-nav-items ${this.state.openMenu ? 'open': ''}`}>
            <li
              className="nav-item"
            >
              <Link onClick={() => this.toggleMenu()} to="/">
                {this.props.strings.titles.home}
              </Link>
            </li>
            <li
              className="nav-item"
              onClick={() => this.onMobileNavItemClick('description')}
            >
              {this.props.strings.titles.aboutMe}
            </li>
            <li
              className="nav-item"
              onClick={() => this.onMobileNavItemClick('workHistory')}
            >
              {this.props.strings.titles.workHistory}
            </li>
            <li
              className="nav-item"
              onClick={() => this.onMobileNavItemClick('education')}
            >
              {this.props.strings.titles.education}
            </li>
            <li
              className="nav-item"
              onClick={() => this.onMobileNavItemClick('skills')}
            >
              {this.props.strings.titles.skills}
            </li>
            <li
              className="nav-item"
              onClick={() => this.onMobileNavItemClick('projects')}
            >
              {this.props.strings.titles.projects}
            </li>
            <li
              className="nav-item"
              onClick={() => this.onMobileNavItemClick('interests')}
            >
              {this.props.strings.titles.interests}
            </li>
            <LanguageSelectorSmall/>
            <i
              className="close material-icons"
              onClick={() => this.toggleMenu()}
            >clear</i>
          </div>
          <li className="home-icon" onClick={() => this.toggleMenu()}>
            <i className="material-icons">menu</i>
          </li>
        </div>
      </StyledNavbar>
    )
  }
};

export default translate(Navbar);
