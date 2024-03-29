import React from 'react';
import {range} from 'lodash';
import styled from 'styled-components/macro';

const MAX_RATE = 10;

const StyledConsoleSkillMeter = styled.tr`
 .skill-title{
    padding-right: 1rem;
    color: white;
  }
  .rates{
    color: ${({theme}) => theme.console.colors.yellow}
  }
  .unrated{
    color: ${({theme}) => theme.console.colors.grey};
  }
`;

const SkillMeter = ({rate, name}) => {
  return(
    <StyledConsoleSkillMeter>

        <td className="skill-title">{name}</td>
        <td className="metrics">
          <span className="rates">
          {
            range(rate).map(() => ' * ' )
          }
          </span>
          <span className="unrated">
            {
              range(MAX_RATE-rate).map(() => ' * ' )
            }
          </span>
        </td>
    </StyledConsoleSkillMeter>
  )
};

export default SkillMeter;
