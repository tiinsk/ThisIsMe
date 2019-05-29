import React from 'react';

import Section from './presentational/section';
import EduItem from './presentational/edu_item';
import TimeLine from './presentational/time_line';
import TimeBubble from './presentational/time_bubble';

import education from '../../data/education';


const Education = () => {
  return(
    <div className="education">
      <Section
        titleId="titles.education"
        backgroundColor="#3e4461"
        titleBackgroundColor="rgba(26, 33, 68, 0.5)"
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
      </Section>
    </div>
  )
};

export default Education;
