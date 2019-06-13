import React from 'react';

import Section from './presentational/section';
import EduItem from './presentational/edu_item';
import TimeLine from './presentational/time_line';
import TimeBubble from './presentational/time_bubble';

import education from '../../data/education';


const Education = ({scrollRef}) => {
  return(
    <div className="education" ref={scrollRef}>
      <Section
        titleId="titles.education"
        maxWidth="1000px"
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
