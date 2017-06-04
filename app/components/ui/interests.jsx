import React from 'react';

import Section from './presentational/section';
import Row from './presentational/row';
import Column from './presentational/column';
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
        <Row>
          <Column
            parts={1}
            ofParts={3}
          >
            <BubbleChart data={data}/>
          </Column>
          <Column
            parts={2}
            ofParts={3}
          >
            <TravelMap/>
          </Column>
        </Row>
      </Section>
    </div>
  )
};

export default translate(Interests);
