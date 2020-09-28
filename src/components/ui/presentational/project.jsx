import React, {useState} from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';

import translate from '../../../components/main/translate';
import Skill from './skill';
import {H1, Paragraph} from '../../../theme/fonts';
import {theme} from "../../../theme";

const IMAGE_WIDTH = 450;
const IMAGE_HEIGHT = 400;

const StyledProject = styled.div`
  position: relative;
  padding-top: ${({theme}) => theme.spaces.base(3)};
  margin-bottom: ${({theme}) => theme.spaces.base(3)};
  
  display: flex;
  align-items: center;
  
  .project {
    margin-right: ${({theme}) => theme.spaces.base(1)};
    
    .project-name {
      ${H1};
  
      .project-number {
        font-size: 140px;
        font-family: ${({theme}) => theme.fonts.fontOpenSans};
        font-weight: ${({theme}) => theme.fontWeights.fontWeightBold};
        color: ${({theme}) => theme.new.colors.black};
        line-height: 120px;
        
        opacity: 0.03;
        position: absolute;
        left: -50px;
        top: 0;
        z-index: -1;
      }
  
      .links {
        display: flex;
        a { 
          display: inline-flex;
          align-items: center;
          
          &:hover span {
            text-decoration: underline;
          }
          
          svg {
            height: 24px;
            width: 24px;
            margin-right: ${({theme}) => theme.spaces.base(0.5)};
          }
          
          i {
            margin-right: ${({theme}) => theme.spaces.base(0.5)};
            text-decoration: none !important;
            display: inline-block;
          }
          
          &:not(:first-of-type):before {
            content: '';
            border-left: 1px solid ${({theme}) => theme.new.colors.black};
            height: 20px;
            margin: ${({theme}) => theme.spaces.base(0.5)};
          }
        }
      }
    }
  
    .project-description {
      text-align: justify;
    }
    
    .project-skills {
      flex-shrink: 0;
      flex-grow: 1;
  
      margin-top: ${({theme}) => theme.spaces.base(0.5)};
  
      display: flex;
      flex-wrap: wrap;
      align-content: flex-end;
    }
  }
  .project-images-wrapper {
    width: 550px;
    overflow: hidden;
    flex-shrink: 0;
    position: relative;
      
    .project-images {
      display: flex;
      position: relative;
      left: 0;
      transition: left ease-in 0.5s;
    
      .project-image {
        height: ${IMAGE_HEIGHT}px;
        width: ${IMAGE_WIDTH}px;
        background-size: cover;
        flex-shrink: 0;
        margin-right: ${({theme}) => theme.spaces.base(1)};
      }
    }
    .arrow {
      display: none;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      padding: ${({theme}) => theme.spaces.base(0.5)};
      margin: 0 ${({theme}) => theme.spaces.base(0.5)};
      
      color: ${({theme}) => theme.new.colors.white};
      background: ${({theme}) => `${theme.new.colors.black}4D`};
      border-radius: 5px;
      &:hover {
        background: ${({theme}) => `${theme.new.colors.black}66`};
      }
    }
    .arrow-back {
      left: 0;
    }
    .arrow-forward {
      right: 0;
    }
    
    &:hover {
      .arrow {
        display: initial;
      }
    }
  }
`;

const lightBoxOptions = {
  settings: {
    autoplaySpeed: 0
  },
  buttons: {
    showThumbnailsButton: false,
    showDownloadButton: false,
  },
  caption: {
    showCaption: false,
  }
};

const Project = ({strings, project, index}) => {
  const [imageIndex, setImageIndex] = useState(0);

  const images = project.images.map(image => require(`../../../assets/projects/${project.key}/${image}`));

  const onBack = () => {
    if(imageIndex > 0) {
      console.log(imageIndex -1);
      setImageIndex(imageIndex - 1);
    }
  }

  const onForward = () => {
    if(imageIndex < project.images.length -1) {
      console.log(imageIndex +1);
      setImageIndex(imageIndex + 1);
    }
  }

  const imageLeft = -imageIndex * (IMAGE_WIDTH + theme.spaces.baseNumber(1));

  return(
    <StyledProject>
      <SimpleReactLightbox>
        <div className="project">
          <div className="project-name">
            <div className="project-number">{`${index + 1 < 10 && '0'}${index + 1}`}</div>
            <div>{strings.projects[project.key].name}</div>
            <div className="links">
              {
                project.link &&
                <a href={project.github} target="_blank"><FontAwesomeIcon icon={faGithub}/><span>{strings.github}</span></a>
              }
              <a href={project.link} target="_blank"><i className="material-icons">public</i><span>{strings.website}</span></a>
            </div>
          </div>
          <Paragraph className="project-description">
            {strings.projects[project.key].description}
          </Paragraph>
          <div className="project-skills">
            {
              project.skills.map( (skill,i) => {
                return (
                  <Skill key={i} skill={skill}/>
                )
              })
            }
          </div>
        </div>
        <div className="project-images-wrapper">
          <SRLWrapper options={lightBoxOptions}>
            <div className="project-images" style={{left: imageLeft}}>
              {
                images.map(image => (
                  <a href={image} data-attribute="SRL">
                    <img className="project-image" src={image} alt="Project image"/>
                  </a>
                ))
              }
            </div>
          </SRLWrapper>
          <button
            className="arrow arrow-back"
            style={{...(imageIndex === 0 ? {display: 'none'} : {})}}
            onClick={onBack}
          >
            <i className="material-icons">arrow_back</i>
          </button>
          <button
            className="arrow arrow-forward"
            style={{...(imageIndex === project.images.length - 1 ? {display: 'none'} : {})}}
            onClick={onForward}
          >
            <i className="material-icons">arrow_forward</i>
          </button>

        </div>
      </SimpleReactLightbox>
    </StyledProject>
  )
};

export default translate(Project);
