import React from 'react';
import styled from 'styled-components/macro';

import Section, {StyledSection} from './presentational/section';
import translate from '../main/translate';
import {H3, Paragraph} from '../../theme/fonts';
import LanguageSkills from './language_skills';
import RatedSkills from './rated_skills';
import RatelessSkills from './rateless_skills';
import iceberg from './../../assets/iceberg.png';

const StyledSkills = styled.div`
  ${H3} {
    text-align: center;
  }
  
  ${Paragraph} {
    text-align: center;
    color: ${({theme}) => theme.new.colors.mediumGrey};
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


const Skills = ({scrollRef}) => {
  return (
    <StyledSkills ref={scrollRef}>
      <Section
        titleId="titles.skills"
        bodyStyle={{marginLeft: 0}}
      >
        <div>
          <div className="skills-wrapper">
            <div className="iceberg">
              <img src={iceberg} alt="Iceberg"/>
            </div>
            <div>
              <RatedSkills/>
              <RatelessSkills/>
            </div>
          </div>
          <LanguageSkills/>
        </div>
      </Section>
    </StyledSkills>
  );
};

export default translate(Skills);
