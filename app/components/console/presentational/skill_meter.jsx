import React from 'react';
import _ from 'lodash';

const MAX_RATE = 10;
import styled from 'styled-components';

const StyledConsoleSkillMeter = styled.tr`
 .skill-title{
    padding-right: 1rem;
    color: white;
  }
  .rates{
    color: ${({theme}) => theme.colors.yellow}
  }
  .unrated{
    color: ${({theme}) => theme.colors.greyText};
  }
`;

const SkillMeter = ({rate, name}) => {
  return(
    <StyledConsoleSkillMeter>

        <td className="skill-title">{name}</td>
        <td className="metrics">
          <span className="rates">
          {
            _.range(rate).map(rateNum => " * " )
          }
          </span>
          <span className="unrated">
            {
              _.range(MAX_RATE-rate).map(rateNum => " * " )
            }
          </span>
        </td>
    </StyledConsoleSkillMeter>
  )
};

export default SkillMeter;
