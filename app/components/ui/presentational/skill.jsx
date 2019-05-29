import React from 'react';
import translate from '../../main/translate';

const Skill = ({strings, skill}) => {
  return(
    <div className="skill">
      {strings.skills.skillNames[skill] || skill}
    </div>
  )
};

export default translate(Skill);
