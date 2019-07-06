import React from 'react';

const LangSkill = ({lang}) => {
  return (
    <div className="console-lang-skill">
      <div>
        <span className="lang">{lang.language}</span> - <span className="level">{lang.level}</span>
      </div>
      <div className="text">{lang.text}</div>
    </div>
  );
};

export default LangSkill;
