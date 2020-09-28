import React from 'react';
import styled from 'styled-components/macro';
import {Waypoint} from 'react-waypoint';

import SkillMeter from './presentational/skill_meter';
import skills from '../../data/skills';
import translate from '../main/translate';
import {H3, Paragraph} from '../../theme/fonts';

const StyledRatedSkills = styled.div`
  .rated-skills {
    display: grid;
    padding-right: ${({theme}) => theme.spaces.baseSize};
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 0 ${({theme}) => theme.spaces.baseSize};
    
    margin-bottom: ${({theme}) => theme.spaces.base(2)};
  }
  
  .first-skill-wrapper {
    .rated-skills {
      margin-bottom: 0;
      grid-template-columns: repeat(auto-fit, 50%);
      justify-content: center;
    }
  }

  @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
    .rated-skills {
      .skill-column {
        flex: 1 0 100%;
        justify-content: center;
      }
    }
  }
`;


class RatedSkills extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topSkillsEntered: false,
      bottomSkillsEntered: false,
    }
  }

  render() {
    return (
        <StyledRatedSkills>
          <H3>{this.props.strings.skills.ratedSkills.topSkills.title}</H3>
          <Paragraph>{this.props.strings.skills.ratedSkills.topSkills.subtitle}</Paragraph>
          <Waypoint
            onEnter={() => {
              this.setState({topSkillsEntered: true})
            }}
            onLeave={() => {
              this.setState({topSkillsEntered: false});
            }}
          >
            <div>
              <div className="first-skill-wrapper">
                <div className="rated-skills">
                  <SkillMeter
                    rate={skills.ratedSkills.highestSkill.value}
                    icon={skills.ratedSkills.highestSkill.key}
                    color={skills.ratedSkills.highestSkill.color}
                    entered={this.state.topSkillsEntered}
                  />
                </div>
              </div>
              <div className="rated-skills">
                {
                  skills.ratedSkills.topSkills.map((skill, i) => {
                    return (
                      <SkillMeter
                        key={i}
                        rate={skill.value}
                        icon={skill.key}
                        color={skill.color}
                        entered={this.state.topSkillsEntered}
                      />
                    )
                  })
                }
              </div>
            </div>
          </Waypoint>
          <H3>{this.props.strings.skills.ratedSkills.bottomSkills.title}</H3>
          <Paragraph>{this.props.strings.skills.ratedSkills.bottomSkills.subtitle}</Paragraph>
          <Waypoint
            onEnter={() => {
              this.setState({bottomSkillsEntered: true})
            }}
            onLeave={() => {
              this.setState({bottomSkillsEntered: false});
            }}
          >
            <div className="rated-skills">
              {
                skills.ratedSkills.bottomSkills.map((skill, i) => {
                  return (
                    <SkillMeter
                      key={i}
                      rate={skill.value}
                      icon={skill.key}
                      color={skill.color}
                      entered={this.state.bottomSkillsEntered}
                    />
                  )
                })
              }
            </div>
          </Waypoint>
        </StyledRatedSkills>
    );
  }
};

export default translate(RatedSkills);
