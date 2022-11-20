import React from 'react';

import Section from './presentational/section';
import EduItem from './presentational/edu-item';
import TimeLine from './presentational/time-line';
import TimeBubble from './presentational/time-bubble';

const Education = ({scrollRef, education}) => {
  return(
    <div className="education" ref={scrollRef}>
      <Section
        title={education.title}
        maxWidth="1100px"
      >
        <TimeLine>
          {
            education.educationList.map((eduItem, i) => {
              return(
                <TimeBubble
                  key={i}
                  from={eduItem.startDate}
                  to={eduItem.endDate}
                  index={i}
                >
                  <EduItem
                    data={eduItem}
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
