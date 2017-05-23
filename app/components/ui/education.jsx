import React from 'react';

import Section from './presentational/section.jsx';
import EduItem from './presentational/edu_item.jsx';
import TimeLine from './presentational/time_line.jsx';
import TimeBubble from './presentational/time_bubble.jsx';
import Row from './presentational/row.jsx';
import Column from './presentational/column.jsx';

import education from '../../data/education';


const Education = () => {
  return(
    <div className="education">
      <Section
        titleId="titles.education"
        backgroundColor="#3e4461"
        titleBackgroundColor="rgba(26, 33, 68, 0.5)"
      >
        <Row>
          <Column
            parts={1}
            ofParts={1}
          >
            <TimeLine>
              {
                education.educationList.map((school, i) => {
                  return(
                    <TimeBubble
                      key={i}
                      from={school.from}
                      to={school.to}
                      index={i}
                    >
                      <EduItem
                        data={school}
                      />
                    </TimeBubble>
                  );
                })
              }
            </TimeLine>
          </Column>
        </Row>
      </Section>
    </div>
  )
};

export default Education;
