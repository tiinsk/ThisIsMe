import React from 'react';
import styled from 'styled-components/macro';

import DashedLine from './dashed-line';
import moment from 'moment';

const StyledConsoleEduItem = styled.div`
  margin: 0.5rem 0;

  .dates {
    margin: 0.5rem 0;
  }
  .edu-title {
    color: ${({ theme }) => theme.console.colors.magenta};
  }
  .school {
    color: white;
  }
  .edu-description {
    margin: 1rem 0;
    color: ${({ theme }) => theme.console.colors.grey};
  }
`;

const EduItem = ({ data }) => {
  return (
    <StyledConsoleEduItem>
      <DashedLine />
      <div className="dates">
        <span>{`${moment(data.startDate).format('MM/YYYY')}`} - </span>
        {data.endDate ? (
          <span>{`${moment(data.endDate).format('MM/YYYY')}`}</span>
        ) : null}
      </div>
      <div>
        <span className="school">{data.school}</span> - {' '}
        <span className="edu-title">{`${data.title} ${data.program ? ' - ' : ''}`}</span>{' '}
        {data.program ? <span className="program">{data.program}</span> : null}
      </div>

      {data.body ? (
        <div className="edu-description">
          <div dangerouslySetInnerHTML={{ __html: data.body }} />
        </div>
      ) : null}
    </StyledConsoleEduItem>
  );
};

export default EduItem;
