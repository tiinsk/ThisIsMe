import React from 'react';
import styled from 'styled-components/macro';

import Section from './presentational/section';
import translate from '../main/translate';
import {H3, Paragraph} from '../../theme/fonts';
import LanguageSkills from './language_skills';
import RatedSkills from './rated_skills';
import RatelessSkills from './rateless_skills';

const StyledSkills = styled.div`
  ${H3} {
    text-align: center;
  }
  
  ${Paragraph} {
    text-align: center;
    color: ${({theme}) => theme.new.colors.mediumGrey};
  }
`;


const Skills = ({scrollRef}) => {
  return (
    <div ref={scrollRef}>
      <Section
        titleId="titles.skills"
      >
        <StyledSkills>
          <RatedSkills/>
          <RatelessSkills/>
          <LanguageSkills/>
        </StyledSkills>
      </Section>
    </div>
  );
};

export default translate(Skills);
