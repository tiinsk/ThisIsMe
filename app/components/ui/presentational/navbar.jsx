import React from 'react';
import {
  Link
} from 'react-router-dom'

import translate from '../../main/translate';
import LanguageSelectorSmall from "../containers/language_selector_small";

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
      <nav className="nav">
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
      </nav>
    )
  }
};

export default translate(Navbar);
