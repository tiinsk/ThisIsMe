import React from 'react';
import DashedLine from './dashed_line';
import styled from 'styled-components/macro';

const StyledConsoleWorkItem = styled.div`
.dates{
    margin: 0.5rem 0;
  }
  .company{
    text-transform: uppercase;
    color: white;
  }
  .work-title{
    margin: 1rem 0;
    color: ${({theme}) => theme.colors.magenta};
  }
  .work-description {
    color: ${({theme}) => theme.colors.greyText};
  }
`;

const WorkItem = ({strings, data}) => {
  return(
    <StyledConsoleWorkItem>
      <DashedLine/>
      <div className="dates">
        <span>{`${data.from.month}/${data.from.year}`} - </span>{data.to && data.to.month && data.to.year ? <span>{`${data.to.month}/${data.to.year}`}</span> : null }
      </div>
      <div className="company">
        {strings.workExperience[data.key].company}
      </div>
      <div className="work-title">
        {strings.workExperience[data.key].title}
      </div>
      <div className="work-description">
        {strings.workExperience[data.key].description}
        <div className="rateless-skills">
          { data.skillList ? data.skillList.map( (skill,i) => {
            return(
              <div key={i} className="rateless-skill">
                <span className="line">/</span>{strings.skills.skillNames[skill] || skill}<span className="line">/</span>
              </div>
            )
          }) : null
          }
        </div>
      </div>
    </StyledConsoleWorkItem>
  )
};

export default WorkItem;
