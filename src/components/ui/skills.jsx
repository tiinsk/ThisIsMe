import React from 'react';
import styled from 'styled-components/macro';

import {H3, Paragraph} from '../../theme/fonts';
import iceberg from './../../assets/iceberg.png';
import LanguageSkills from './language-skills';
import Section, {StyledSection} from './presentational/section';
import RatedSkills from './rated-skills';
import RatelessSkills from './rateless-skills';

const StyledSkills = styled.div`
  ${H3} {
    text-align: center;
  }
  
  ${Paragraph} {
    text-align: center;
    color: ${({theme}) => theme.UI.colors.mediumGrey};
  }
  ${StyledSection} {
    @media (min-width: ${({theme}) => theme.breakpoints.smSize}) and (max-width: ${({theme}) => theme.breakpoints.mdSize}){
      margin-right: 0;
    }
  }
  
  .skills-wrapper {
    display: flex;
    
    .iceberg {
      width: 50%;
      flex-shrink: 0;
      margin-left: -90px;
      overflow: hidden;
      
      img {
        position: relative;
        width: 100%;
      }
    }
    
    @media (max-width: ${({theme}) => theme.breakpoints.lgSize}){
      flex-direction: row-reverse;
      .iceberg {
        margin-left: 0;
      }
    } 
    @media (max-width: ${({theme}) => theme.breakpoints.mdSize}){
      .iceberg {
        width: 35%;
        img {
          position: relative;
          width: 200%;
          left: 0;
        }
      }
    } 
    @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
      .iceberg {
        width: 0;
        display: none;
      }
    } 
  }
`;


const Skills = ({scrollRef, skills}) => {
  return (
    <StyledSkills ref={scrollRef}>
      <Section
        title={skills.title}
        bodyStyle={{marginLeft: 0}}
      >
        <div>
          <div className="skills-wrapper">
            <div className="iceberg">
              <img src={iceberg} alt="Iceberg"/>
            </div>
            <div>
              <RatedSkills
                topSkillTitle={skills.ratedTopSkillTitle}
                topSkillBody={skills.ratedTopSkillBody}
                otherSkillTitle={skills.ratedOtherSkillTitle}
                otherSkillBody={skills.ratedOtherSkillBody}
                topSkills={skills.ratedTopSkills}
                otherSkills={skills.ratedOtherSkills}
              />
              <RatelessSkills
                topSkillTitle={skills.ratelessTopSkillTitle}
                topSkillBody={skills.ratelessTopSkillBody}
                otherSkillTitle={skills.ratelessOtherSkillTitle}
                otherSkillBody={skills.ratelessOtherSkillBody}
                topSkills={skills.ratelessTopSkills}
                otherSkills={skills.ratelessOtherSkills}
              />
            </div>
          </div>
          <LanguageSkills
            title={skills.languageSkillTitle}
            languageSkills={skills.languageSkills}
          />
        </div>
      </Section>
    </StyledSkills>
  );
};

export default Skills;
