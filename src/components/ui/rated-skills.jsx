import React from 'react';
import {Waypoint} from 'react-waypoint';
import styled from 'styled-components/macro';

import {H3, Paragraph} from '../../theme/fonts';
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
  
  .top-skills-wrapper {
    @media (max-width: ${({theme}) => theme.breakpoints.xsSize}){
      margin-bottom: ${({theme}) => theme.spaces.base(2)};
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
        <H3>{this.props.topSkillTitle}</H3>
        <Paragraph>{this.props.topSkillBody}</Paragraph>
        <Waypoint
          onEnter={() => {
            this.setState({topSkillsEntered: true})
          }}
          onLeave={() => {
            this.setState({topSkillsEntered: false});
          }}
        >
          <div className="top-skills-wrapper">
            <div className="first-skill-wrapper">
              <div className="rated-skills">
                <SkillMeter
                  rate={this.props.topSkills[0].rate}
                  icon={this.props.topSkills[0].image.url}
                  name={this.props.topSkills[0].skill.name}
                  color1={this.props.topSkills[0].color1.hex}
                  color2={this.props.topSkills[0].color2.hex}
                  entered={this.state.topSkillsEntered}
                />
              </div>
            </div>
            <div className="rated-skills">
              {
                this.props.topSkills.slice(1).map((skillItem, i) => {
                  return (
                    <SkillMeter
                      key={i}
                      rate={skillItem.rate}
                      icon={skillItem.image.url}
                      name={skillItem.skill.name}
                      color1={skillItem.color1.hex}
                      color2={skillItem.color2.hex}
                      entered={this.state.topSkillsEntered}
                    />
                  )
                })
              }
            </div>
          </div>
        </Waypoint>
        <H3>{this.props.otherSkillTitle}</H3>
        <Paragraph>{this.props.otherSkillBody}</Paragraph>
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
              this.props.otherSkills.map((skillItem, i) => {
                return (
                  <SkillMeter
                    key={i}
                    rate={skillItem.rate}
                    icon={skillItem.image.url}
                    color1={skillItem.color1.hex}
                    color2={skillItem.color2.hex}
                    name={skillItem.skill.name}
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
}

export default RatedSkills;
