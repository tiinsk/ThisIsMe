import React from 'react';
import styled from 'styled-components/macro';

import LanguageSelectorSmall from '../containers/language-selector-small';

const StyledNavbar = styled.nav`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${({theme}) => theme.navBarHeight};

  .nav-list {
    height: 100%;

    list-style-type: none;

    display: flex;
    align-items: center;
    justify-content: space-around;

    padding: 0;
    margin: 0 ${({theme}) => theme.spaces.base(2)};

    .nav-item {
      font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
      text-transform: uppercase;
      font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};
      color: ${({theme}) => theme.UI.colors.white};
      text-align: center;

      cursor: pointer;
    }
  }
 

  @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
    .nav-list {
      display: none;
    }
  }
`;

const StyledMobileNavbar = styled.div`
  display: none;
  justify-content: flex-end;

  .home-icon{
    position: absolute;
    top: 0;
    right: 0;
    
    padding: ${({theme}) => theme.spaces.baseSize};
    
    .material-icons {
      color: ${({theme}) => theme.UI.colors.white};
      font-size: ${({theme}) => theme.fontSizes.fontSizeXXLarge};
    }
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
    
    margin: 0;
    padding: 0;

    background: ${({theme}) => theme.UI.colors.white};

    flex-direction: column;
    justify-content: center;
    align-items: center;

    .mobile-nav-item {
      display: block;
      font-size: ${({theme}) => theme.fontSizes.fontSizeXLarge};
      margin-bottom: ${({theme}) => theme.spaces.baseSize};
      color: ${({theme}) => theme.UI.colors.black};
      
      text-transform: uppercase;
      font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};
      cursor: pointer;
    }

    .close {
      color: ${({theme}) => theme.UI.colors.black};
      padding: ${({theme}) => theme.spaces.baseSize};
      position: absolute;
      top: 0;
      right: 0;

      cursor: pointer;

      font-size: ${({theme}) => theme.fontSizes.fontSizeXXLarge};
    }
    .language-selector-small {
      .lang {
        color: $${({theme}) => theme.UI.colors.lightGrey};
        border-color: $${({theme}) => theme.UI.colors.lightGrey};
        &.selected {
          color: white;
        }
      }
    }
  }
  
  @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
    display: flex;
  }
`;


class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openMenu: false
    }
  }

  toggleMenu() {
    if (this.state.openMenu) {
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


  render() {
    return (
      <>
        <StyledNavbar>
          <ul className="nav-list">
            <li
              className="nav-item"
              onClick={() => this.props.onScrollToRef('workHistory')}
            >
              {this.props.header.workhistory}
            </li>
            <li
              className="nav-item"
              onClick={() => this.props.onScrollToRef('education')}
            >
              {this.props.header.education}
            </li>
            <li
              className="nav-item"
              onClick={() => this.props.onScrollToRef('skills')}
            >
              {this.props.header.skills}
            </li>
            <li
              className="nav-item"
              onClick={() => this.props.onScrollToRef('projects')}
            >
              {this.props.header.projects}
            </li>
            <li
              className="nav-item"
              onClick={() => this.props.onScrollToRef('interests')}
            >
              {this.props.header.interests}
            </li>
          </ul>
        </StyledNavbar>
        <StyledMobileNavbar>
          <button className="home-icon" onClick={() => this.toggleMenu()}>
            <i className="material-icons">menu</i>
          </button>
          <ul className={`mobile-nav-items ${this.state.openMenu ? 'open' : ''}`}>
            <li
              className="mobile-nav-item"
              onClick={() => this.onMobileNavItemClick('aboutMe')}
            >
              {this.props.header.aboutme}
            </li>
            <li
              className="mobile-nav-item"
              onClick={() => this.onMobileNavItemClick('workHistory')}
            >
              {this.props.header.workhistory}
            </li>
            <li
              className="mobile-nav-item"
              onClick={() => this.onMobileNavItemClick('education')}
            >
              {this.props.header.education}
            </li>
            <li
              className="mobile-nav-item"
              onClick={() => this.onMobileNavItemClick('skills')}
            >
              {this.props.header.skills}
            </li>
            <li
              className="mobile-nav-item"
              onClick={() => this.onMobileNavItemClick('projects')}
            >
              {this.props.header.projects}
            </li>
            <li
              className="mobile-nav-item"
              onClick={() => this.onMobileNavItemClick('interests')}
            >
              {this.props.header.interests}
            </li>
            <LanguageSelectorSmall onCloseMenu={() => this.toggleMenu()}/>
            <i
              className="close material-icons"
              onClick={() => this.toggleMenu()}
            >clear</i>
          </ul>
        </StyledMobileNavbar>
      </>
    )
  }
};

export default Navbar;
