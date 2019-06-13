import React from 'react';

import Section from './presentational/section';
import TravelMap from './presentational/travel_map';
import translate from '../main/translate';

const Interests = ({strings, scrollRef}) => {
  return (
    <div ref={scrollRef}>
      <Section
        titleId="titles.interests"
      >
        <div className="interests">
          <TravelMap/>
          <div className="interest-list">
            {
              strings.interests.interest_list.map(interest => (
                <div className="interest" key={interest}>{interest}</div>
              ))
            }
          </div>
        </div>
      </Section>
    </div>
  )
};

export default translate(Interests);
