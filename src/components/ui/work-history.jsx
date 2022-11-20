import React from 'react';

import Section from './presentational/section';
import TimeBubble from './presentational/time-bubble';
import TimeLine from './presentational/time-line';
import WorkItem from './presentational/work-item';

const WorkHistory = ({scrollRef, workHistory}) => {
  return (
    <div ref={scrollRef}>
      <Section
        title={workHistory.title}
        maxWidth="1100px"
      >
        <TimeLine>
          {
            workHistory.workHistoryList.map((workitem, i) => {
              return (
                <TimeBubble
                  key={i}
                  from={workitem.startDate}
                  to={workitem.endDate}
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

export default WorkHistory;
