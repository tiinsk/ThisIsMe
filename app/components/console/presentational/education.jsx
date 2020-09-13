import React from 'react';
import EduItem from './edu_item';

import education from '../../../data/education';
import styled from 'styled-components';

const StyledConsoleEducation = styled.div`

`;

const Education = ({strings}) => {
  return(
    <StyledConsoleEducation>
      {
        education.educationList.map((school, i) => {
          return(
            <EduItem
              key={i}
              strings={strings}
              data={school}
            />
          );
        })
      }
    </StyledConsoleEducation>
  )
};

export default Education;
