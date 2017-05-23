import React from 'react';

import Section from './presentational/section.jsx';
import Row from './presentational/row.jsx';
import Column from './presentational/column.jsx';
import WorkItem from './presentational/work_item.jsx';

import workExperience from '../../data/work_experience';
import TimeLine from './presentational/time_line.jsx';
import TimeBubble from './presentational/time_bubble.jsx';

import translate from '../../translate.jsx';

const WorkHistory = () => {

  return (
    <div className="work-history">
      <Section
        titleId="titles.workHistory"
        backgroundColor="#2e3157"
        titleBackgroundColor="rgba(14, 23, 53, 0.5)"
      >
        <Row>
          <Column
            parts={1}
            ofParts={1}
          >
            <TimeLine>
              {
                [...workExperience.workexp, ...workExperience.otherworkexp].map((workitem, i) => {
                  return (
                    <TimeBubble
                      key={i}
                      from={workitem.from}
                      to={workitem.to}
                      index={i}
                    >
                      <WorkItem
                        data={workitem}
                      />
                    </TimeBubble>
                  )
                })
              }
            </TimeLine>
          </Column>
        </Row>
      </Section>
    </div>
  )
};

export default translate(WorkHistory);
