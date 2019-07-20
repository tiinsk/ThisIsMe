import React from 'react';

import workExperience from '../../../data/work-experience';
import WorkItem from './work-item';

const WorkHistory = ({strings}) => {
  return (
    <div>
      {
        workExperience.workexp.map((workitem, i) => {
          return (
            <WorkItem
              strings={strings}
              key={i}
              data={workitem}
            />
          )
        })
      }
    </div>
  )
};

export default WorkHistory;
