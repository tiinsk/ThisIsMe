import React from 'react';
import WorkItem from './work_item';

import workExperience from '../../../data/work_experience';

const WorkHistory = ({strings}) => {
  return(
    <div className="console-education">
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
