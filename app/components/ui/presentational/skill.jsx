import React from 'react';
import translate from '../../main/translate';
import styled from 'styled-components';

const StyledSkill = styled.div`
display: flex;
  justify-content: center;
  align-items: center;

  padding: ${({theme}) => theme.spaces.baseSize}/8 ${({theme}) => theme.spaces.baseSize}/2;
  margin: ${({theme}) => theme.spaces.baseSize}/8;

  border-radius: 30px;
  height: 30px;

  background: ${({theme}) => theme.colors.greenSkillBackground};

  color: ${({theme}) => theme.colors.greenSkillText};
  font-family: ${({theme}) => theme.fonts.fontLato};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};
  text-transform: uppercase;
  font-size: ${({theme}) => theme.fontSizes.fontSizeXSmall};
`;

const Skill = ({strings, skill}) => {
  return(
    <StyledSkill>
      {strings.skills.skillNames[skill] || skill}
    </StyledSkill>
  )
};

export default translate(Skill);
