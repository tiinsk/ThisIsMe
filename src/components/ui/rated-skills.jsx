import React from 'react';
import {Waypoint} from 'react-waypoint';
import styled from 'styled-components/macro';

import skills from '../../data/skills';
import {H3, Paragraph} from '../../theme/fonts';
import translate from '../main/translate';
import SkillMeter from './presentational/skill-meter';

const StyledRatedSkills = styled.div`
  .rated-skills {
    display: grid;
    padding-right: ${({theme}) => theme.spaces.baseSize};
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-items: center;
  }
  
  .first-skill-wrapper {
    .rated-skills {
      margin-bottom: 0;
    }
  }

  @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
    .first-skill-wrapper {
      .rated-skills {
        grid-template-columns: repeat(auto-fit, 100%);
      }
    }
    .rated-skills {
      grid-template-columns: repeat(auto-fit, 100%);
      padding: 0;
    }
  }
`;


class RatedSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topSkillsEntered: false,
      otherSkillsEntered: false,
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
        <H3>{this.props.strings.skills.ratedSkills.otherSkills.title}</H3>
        <Paragraph>{this.props.strings.skills.ratedSkills.otherSkills.subtitle}</Paragraph>
        <Waypoint
          onEnter={() => {
            this.setState({otherSkillsEntered: true})
          }}
          onLeave={() => {
            this.setState({otherSkillsEntered: false});
          }}
        >
          <div className="rated-skills">
            {
              skills.ratedSkills.otherSkills.map((skill, i) => {
                return (
                  <SkillMeter
                    key={i}
                    rate={skill.value}
                    icon={skill.key}
                    color={skill.color}
                    entered={this.state.otherSkillsEntered}
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
