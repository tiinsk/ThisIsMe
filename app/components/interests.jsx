import React from 'react';

import Section from './presentational/section.jsx';
import Row from './presentational/row.jsx';
import Column from './presentational/column.jsx';
import BubbleChart from './presentational/bubble_chart.jsx';
import TravelMap from './presentational/travel_map.jsx';
import translate from '../translate.jsx';

const Interests = ({strings}) => {

  const data = [
    {
      size: 15,
      items: strings.skills.interests.top
    },
    {
      size: 10,
      items: strings.skills.interests.middle
    },
    {
      size: 5,
      items: strings.skills.interests.lower
    }
  ];

  return(
    <div className="interests">
      <Section
        titleId="titles.interests"
        backgroundColor="#2e3157"
        titleBackgroundColor="rgba(15, 17, 45, 0.5)"
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
