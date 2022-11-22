import React from 'react';

import WorkItem from './work-item';

const WorkHistory = ({strings, data}) => {
  return (
    <div>
      {
        data.workHistory.workHistoryList.map((workitem, i) => {
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
