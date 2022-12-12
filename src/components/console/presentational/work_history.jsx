import React from 'react';
import WorkItem from './work_item';

import workExperience from '../../../data/work_experience';
import styled from 'styled-components/macro';

const StyledConsoleWorkHistory = styled.div`

`;

const WorkHistory = ({strings}) => {
  return(
    <StyledConsoleWorkHistory>
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
    </StyledConsoleWorkHistory>
  )
};

export default WorkHistory;
