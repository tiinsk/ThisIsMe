import React from 'react';
import DashedLine from './dashed-line';
import styled from 'styled-components/macro';
import moment from 'moment';

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
    color: ${({theme}) => theme.console.colors.magenta};
  }
  .work-description {
    color: ${({theme}) => theme.console.colors.grey};
  }
`;

const WorkItem = ({data}) => {
  return(
    <StyledConsoleWorkItem>
      <DashedLine/>
      <div className="dates">
        <span>{`${moment(data.startDate).format('MM/YYYY')}`} - </span>{data.endDate ? <span>{`${moment(data.endDate).format('MM/YYYY')}`}</span> : null }
      </div>
      <div className="company">
        {data.company}
      </div>
      <div className="work-title">
        {data.title}
      </div>
      <div className="work-description">
        {data.body}
        <div className="rateless-skills">
          { data.peakSkills ? data.peakSkills.map( (skill,i) => {
            return(
              <div key={i} className="rateless-skill">
                <span className="line">/</span><span className="asterix">*</span>{skill.name}<span className="line">/</span>
              </div>
            )
          }) : null
          }
          { data.skillls ? data.skills.map( (skill,i) => {
            return(
              <div key={i} className="rateless-skill">
                <span className="line">/</span>{skill.name}<span className="line">/</span>
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
