import React from 'react';
import styled from 'styled-components/macro';

import {H3, H4, Paragraph} from '../../../theme/fonts';

const StyledEduItem = styled.div`
  .degree {
    margin-top: ${({theme}) => theme.spaces.base(0.5)};
    margin-bottom: 0;
  }
  .program {
    margin-top: 0;
    margin-bottom: ${({theme}) => theme.spaces.base(0.5)};
  }
  p {
    margin-top: ${({theme}) => theme.spaces.base(0.25)};
    margin-bottom: 0;
  }
`;

const EduItem = ({data}) => {
  return (
    <StyledEduItem>
      <H3>{data.school}</H3>
      <H4 className="degree">{`${data.title}${data.program ? ',' : ''}`}</H4>
      {
        data.program ?
          <H4 className="program">{data.program}</H4> : null
      }
      {data.body ?
        <Paragraph>{data.body}</Paragraph> : null
      }
    </StyledEduItem>
  )
};

export default EduItem;
