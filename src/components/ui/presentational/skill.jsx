import React from 'react';
import styled from 'styled-components/macro';

import PeakIcon from '../../../assets/peakIcon.svg';
import {TagText} from '../../../theme/fonts';

const StyledSkill = styled.div`
  ${TagText};
  
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 3px;
  margin-right: ${({theme}) => theme.spaces.base(0.4)};
  margin-bottom: ${({theme}) => theme.spaces.base(0.4)};

  border-radius: 15px;
  height: 30px;
  
  background: ${({theme}) => theme.UI.colors.white};
  box-shadow: 0 2px 5px 0 rgba(33,41,32,0.17);
  
  .skill-wrapper {
    border: 1px solid ${({isPeakSkill, theme}) => isPeakSkill ? theme.UI.colors.greenTransparent : 'transparent'};
    border-radius: 15px;
    padding: 4px 10px;
    display: flex;
    align-items: center;
  }
`;

const StyledPeakIcon = styled(PeakIcon)`
  margin-right: ${({theme}) => theme.spaces.base(0.25)};
`;

const Skill = ({skill, isPeakSkill = false}) => {
  return (
    <StyledSkill isPeakSkill={isPeakSkill}>
      <div className="skill-wrapper">
        {isPeakSkill && <StyledPeakIcon/>}
        {skill}
      </div>
    </StyledSkill>
  )
};

export default Skill;
