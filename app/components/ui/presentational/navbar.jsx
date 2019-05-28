import React from 'react';
import {
  Link
} from 'react-router-dom'

import translate from '../../main/translate';

const Navbar = ({strings}) => {
  return(
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">{strings.titles.aboutMe}</li>
        <li className="nav-item">{strings.titles.workHistory}</li>
        <li className="nav-item">{strings.titles.education}</li>
        <li className="nav-item">{strings.titles.skills}</li>
        <li className="nav-item">{strings.titles.interests}</li>
        <li className="nav-item">{strings.titles.projects}</li>
        <li>
          <Link className="home-icon" to="/" >
            <i className="material-icons">menu</i>
          </Link>
        </li>
      </ul>
    </nav>
  )
};

export default translate(Navbar);
