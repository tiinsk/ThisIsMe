import React from 'react';

import Section from './presentational/section';
import Skill from './presentational/skill';
import SkillMeter from './presentational/skill_meter';

import skills from '../../data/skills';

import translate from '../main/translate';
import {Waypoint} from "react-waypoint";
import styled from 'styled-components/macro';

const StyledSkills = styled.div`
.rated-skills {
    display: grid;
    padding-right: ${({theme}) => theme.spaces.baseSize};
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 0 ${({theme}) => theme.spaces.baseSize};
  }
  .rateless-skills {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  .lang-skills {
    margin-top: ${({theme}) => theme.spaces.baseSize}*2;
    display: flex;

    .language {
      width: 33%;
      padding-right: ${({theme}) => theme.spaces.baseSize}/2;

      .lang-title {
        display: flex;
        align-items: flex-end;

        margin-bottom: ${({theme}) => theme.spaces.baseSize}/2;

        .lang-name {
          font-family: ${({theme}) => theme.fonts.fontQuicksand};
          font-size: ${({theme}) => theme.fontSizes.fontSizeXXXLarge};
          font-weight: ${({theme}) => theme.fontWeights.fontWeightMedium};

          margin-right: ${({theme}) => theme.spaces.baseSize}/2;
        }
        .lang-level {
          padding-bottom: 6px;

          font-family: ${({theme}) => theme.fonts.fontLato};
          font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
          font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
          color: #B0B0B0;
        }
      }

      .lang-text {
        font-family: ${({theme}) => theme.fonts.fontLato};
        font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
        font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
      }
    }
  }

  @media (max-width: ${({theme}) => theme.breakpoints.breakpointMobile}){
    .rated-skills {
      .skill-column {
        flex: 1 0 100%;
        justify-content: center;
      }
    }
    .lang-skills {
      flex-wrap: wrap;
      .language {
        width: 100%;
        margin-top: ${({theme}) => theme.spaces.baseSize}/2;
      }
    }
  }
`;


class Skills extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      entered: false
    }
  }

  render() {
    return (
      <div ref={this.props.scrollRef}>
        <Section
          titleId="titles.skills"
        >
          <StyledSkills>
            <Waypoint
              onEnter={() => {
                this.setState({entered: true})
              }}
              onLeave={() => {
                this.setState({entered: false});
              }}
            >
              <div className="rated-skills">
                {
                  skills.rated_skills.map((skill, i) => {
                    return (
                      <SkillMeter
                        key={i}
                        rate={skill.value}
                        icon={skill.key}
                        color={skill.color}
                        textColor={skill.textColor}
                        entered={this.state.entered}
                      />
                    )
                  })
                }
              </div>
            </Waypoint>
            <div className="rateless-skills">
              <div className="rateless-skills">
                {
                  skills.otherSkills.map((skill, i) => {
                    return (
                      <Skill key={i} skill={skill}/>
                    )
                  })
                }
              </div>
            </div>
            <div className="lang-skills">
              {
                this.props.strings.skills.languages.map((language) => {
                  return (
                    <div className="language" key={language.language}>
                      <div className="lang-title">
                        <div className="lang-name">
                          {language.language}
                        </div>
                        <div className="lang-level">
                          {language.level}
                        </div>
                      </div>
                      <div className="lang-text">
                        {language.text}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </StyledSkills>
        </Section>
      </div>
    );
  }
};

export default translate(Skills);
