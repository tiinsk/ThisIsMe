import React from 'react';

import workExperience from '../../data/work_experience';
import translate from '../main/translate';
import Section from './presentational/section';
import TimeBubble from './presentational/time-bubble';
import TimeLine from './presentational/time-line';
import WorkItem from './presentational/work-item';

const WorkHistory = ({scrollRef}) => {

  return (
    <div ref={scrollRef}>
      <Section
        titleId="titles.workHistory"
        maxWidth="1100px"
      >
        <TimeLine>
          {
            workExperience.workexp.map((workitem, i) => {
              return (
                <TimeBubble
                  key={i}
                  from={workitem.from}
                  to={workitem.to}
                  index={i}
                >
                  <WorkItem
                    data={workitem}
                    isOnLeft={i % 2 === 0}
                  />
                </TimeBubble>
              )
            })
          }
        </TimeLine>
      </Section>
    </div>
  )
};

export default translate(WorkHistory);
