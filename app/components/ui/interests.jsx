import React from 'react';

import Section from './presentational/section';
import BubbleChart from './presentational/bubble_chart';
import TravelMap from './presentational/travel_map';
import translate from '../main/translate';

const Interests = ({strings}) => {

  const data = [
    {
      size: 30,
      items: strings.interests.top
    },
    {
      size: 20,
      items: strings.interests.middle
    },
    {
      size: 10,
      items: strings.interests.lower
    }
  ];

  return(
    <div className="interests">
      <Section
        titleId="titles.interests"
      >
        <BubbleChart data={data}/>
        <TravelMap/>
      </Section>
    </div>
  )
};

export default translate(Interests);
