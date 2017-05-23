import React from 'react';
import _ from 'lodash';

const Skill = ({rate, maxRate, textLabel, symbol}) => {
  return(
    <div className="skill">
      <div className="label">{textLabel}</div>
      <div className="ratings">
        {
          _.range(maxRate).map((i) => {
            return (
              <div key={i} className={"skill-item" + " " + (i+1 > rate ? "empty" : "full") }><i className={"fa " + symbol}/></div>
            )
          })
        }
      </div>
    </div>
  )
};

export default Skill;
