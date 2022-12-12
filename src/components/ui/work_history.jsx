import React from 'react';

import Section from './presentational/section';
import WorkItem from './presentational/work_item';

import workExperience from '../../data/work_experience';
import TimeLine from './presentational/time_line';
import TimeBubble from './presentational/time_bubble';

import translate from '../main/translate';

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
