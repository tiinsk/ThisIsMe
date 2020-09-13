import React from 'react';
import styled from 'styled-components/macro';
import {ReactComponent as PeakIcon} from '../icons/peakIcon.svg';

import translate from '../../main/translate';
import {TagText} from '../../../theme/fonts';

const StyledSkill = styled.div`
  ${TagText};
  
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 3px;
  margin: ${({theme}) => theme.spaces.base(0.2)};

  border-radius: 15px;
  height: 30px;
  
  background: ${({theme}) => theme.new.colors.white};
  box-shadow: 0 2px 5px 0 rgba(33,41,32,0.17);
  
  .skill-wrapper {
    border: 1px solid ${({isPeakSkill, theme}) => isPeakSkill ? theme.new.colors.greenTransparent : 'transparent'};
    border-radius: 15px;
    padding: 4px 10px;
  }
`;

const StyledPeakIcon = styled(PeakIcon)`
  margin-right: ${({theme}) => theme.spaces.base(0.25)};
`;

const Skill = ({strings, skill, isPeakSkill = false}) => {
  return(
    <StyledSkill isPeakSkill={isPeakSkill}>
      <div className="skill-wrapper">
        {isPeakSkill && <StyledPeakIcon/>}
        {strings.skills.skillNames[skill] || skill}
      </div>
    </StyledSkill>
  )
};

export default translate(Skill);
