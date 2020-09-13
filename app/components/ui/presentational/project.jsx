import React from 'react';
import translate from '../../../components/main/translate';
import Skill from './skill';
import IconButton from "./icon_button";

import styled from 'styled-components';

const StyledProject = styled.div`
    position: relative;
    overflow: hidden;

    max-width: 500px;

    .project-image {
      background-size: cover;
      padding-bottom: 65%;
    }

    .project-name {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin: ${({theme}) => theme.spaces.baseSize}*2 0 ${({theme}) => theme.spaces.baseSize} 0;

      text-transform: uppercase;
      font-family: ${({theme}) => theme.fonts.fontQuicksand};
      font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};
      font-size: ${({theme}) => theme.fontSizes.fontSizeXXLarge};
      color: ${({theme}) => theme.colors.black};

      .icons {
        display: flex;
        margin-left: ${({theme}) => theme.spaces.baseSize}/2;
        a:first-child {
          margin-right: ${({theme}) => theme.spaces.baseSize}/4;
        }
      }
    }

    .project-description {
      text-align: justify;
      font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
      font-family: ${({theme}) => theme.fonts.fontOpenSans};
      font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
      color: ${({theme}) => theme.colors.black};
      line-height: ${({theme}) => theme.spaces.baseSize};
    }
    .project-skills {
      flex-shrink: 0;
      flex-grow: 1;

      margin-top: ${({theme}) => theme.spaces.baseSize}/2;

      display: flex;
      flex-wrap: wrap;
      align-content: flex-end;
    }
  }
  @media (max-width: ${({theme}) => theme.breakpoints.breakpointSmallWindow}) {
    .project-image {
      //height: 255px;
    }
  }

  @media (max-width: ${({theme}) => theme.breakpoints.breakpointMobile}){
    .corner {
      display: none;
    }
`;

const Project = ({strings, project}) => {

  const image = require("../../../../assets/"+ project.image);

  return(
    <StyledProject>
      <div className="project-image" style={{backgroundImage: `url(${image}`}}/>
      <div className="project-name">
        <div>{strings.projects[project.key].name}</div>
        <div className="icons">
          {
            project.link ?
            <IconButton
              icon="public"
              link={project.link}
              type="material-icons"
            /> : ""
          }
          <IconButton
            icon="github"
            link={project.github}
            type="fa-icons"
          />
        </div>
      </div>
      <div className="project-description">
        {strings.projects[project.key].description}
      </div>
      <div className="project-skills">
        {
          project.skills.map( (skill,i) => {
            return (
              <Skill key={i} skill={skill}/>
            )
          })
        }
      </div>
    </StyledProject>
  )
};

export default translate(Project);
