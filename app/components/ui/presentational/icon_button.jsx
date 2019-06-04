import React from 'react';

import translate from '../../../components/main/translate';

const IconButton = ({strings, icon, link, type = 'material-icons'}) => {
  let iconComponent;

  if(type === 'material-icons') {
    iconComponent = <i className="material-icons">{icon}</i>;
  }
  else if(type === 'fa-icons') {
    iconComponent = <i className={`fa fa-${icon}`}/>;
  }

  return(
    <a href={link} target="_blank" className="icon-button">
      {iconComponent}
    </a>
  )
};

export default translate(IconButton);
