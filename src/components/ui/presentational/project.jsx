import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import SimpleReactLightbox, {SRLWrapper} from 'simple-react-lightbox';
import styled from 'styled-components/macro';

import translate from '../../../components/main/translate';
import {theme} from '../../../theme';
import {H1, Paragraph} from '../../../theme/fonts';
import Skill from './skill';

const IMAGE_WIDTH = 450;
const IMAGE_HEIGHT = 400;

const StyledProject = styled.div`
  position: relative;
  padding-top: ${({theme}) => theme.spaces.base(3)};
  margin-bottom: ${({theme}) => theme.spaces.base(3)};
  
  display: flex;
  align-items: flex-start;
  
  @media (max-width: ${({theme}) => theme.breakpoints.lgSize}) {
    padding-top: ${({theme}) => theme.spaces.base(2)};
    flex-direction: column;
  }
  
  .project {
    margin-right: ${({theme}) => theme.spaces.base(1)};
    
    .project-name {
      ${H1};
  
      .project-number {
        font-size: 140px;
        font-family: ${({theme}) => theme.fonts.fontOpenSans};
        font-weight: ${({theme}) => theme.fontWeights.fontWeightBold};
        color: ${({theme}) => theme.UI.colors.black};
        line-height: 120px;
        
        opacity: 0.03;
        position: absolute;
        left: -50px;
        top: 0;
        z-index: -1;
        @media (max-width: ${({theme}) => theme.breakpoints.smSize}) {
          font-size: 70px;
          top: -45px;
          left: 0;
        }
      }
  
      .links {
        display: flex;
        margin: ${({theme}) => theme.spaces.base(0.5)} 0;
        
        a { 
          display: inline-flex;
          align-items: center;
          
          &:hover span {
            text-decoration: underline;
          }
          
          svg {
            height: 15px;
            width: 15px;
            margin-right: ${({theme}) => theme.spaces.base(0.5)};
          }
          
          i {
            margin-right: ${({theme}) => theme.spaces.base(0.5)};
            text-decoration: none !important;
            display: inline-block;
            font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
          }
          
          &:not(:first-of-type):before {
            content: '';
            border-left: 1px solid ${({theme}) => theme.UI.colors.black};
            height: 20px;
            margin: 0 ${({theme}) => theme.spaces.base(0.5)};
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
    --imageWidth: ${IMAGE_WIDTH}px;
    --imageHeight: ${IMAGE_HEIGHT}px;
    
    @media (max-width: ${({theme}) => theme.breakpoints.smSize}) {
      --imageWidth: ${IMAGE_WIDTH * 0.75}px;
      --imageHeight: ${IMAGE_HEIGHT * 0.75}px;
    }
    
    @media (max-width: ${({theme}) => theme.breakpoints.xsSize}) {
      --imageWidth: ${IMAGE_WIDTH * 0.6}px;
      --imageHeight: ${IMAGE_HEIGHT * 0.6}px;
    }
    
    width: calc(var(--imageWidth) * 1.5 + ${({theme}) => theme.spaces.base(2)});
    overflow: hidden;
    flex-shrink: 0;
    position: relative;
    
    @media (max-width: ${({theme}) => theme.breakpoints.lgSize}) {
      margin-top: ${({theme}) => theme.spaces.base(1)};
      width: 100%;
    }
    
    @media (min-width: ${({theme}) => theme.breakpoints.xxlgSize}) {
      width: calc(var(--imageWidth) * 2 + ${({theme}) => theme.spaces.base(2)});
    }
      
    .project-images {
      display: flex;
      position: relative;
      left: 0;
      transition: left ease-in 0.5s;
    
      .project-image {
        height: var(--imageHeight);
        width: var(--imageWidth);
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
      
      color: ${({theme}) => theme.UI.colors.white};
      background: ${({theme}) => `${theme.UI.colors.black}4D`};
      border-radius: 5px;
      &:hover {
        background: ${({theme}) => `${theme.UI.colors.black}66`};
      }
    }
    .arrow-back {
      left: 0;
    }
    .arrow-forward {
      right: ${({theme}) => theme.spaces.base(1)};
      
      @media (max-width: ${({theme}) => theme.breakpoints.xlgSize}) {
        right: 0;
      }
    }
    
    &:hover {
      .arrow-back {
        display: ${({currentImageIndex}) => currentImageIndex > 0 ? 'initial' : 'none'};
      }
    
      .arrow-forward {
        display: ${({currentImageIndex, totalImages}) => currentImageIndex < (totalImages - 1) ? 'initial' : 'none'};
        @media (min-width: ${({theme}) => theme.breakpoints.xxlgSize}) {
          display: ${({currentImageIndex, totalImages}) => currentImageIndex < (totalImages - 2) ? 'initial' : 'none'};
        }
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
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  }

  const onForward = () => {
    if (imageIndex < project.images.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  }

  const imageLeft = -imageIndex * (IMAGE_WIDTH + theme.spaces.baseNumber(1));

  return (
    <StyledProject
      currentImageIndex={imageIndex}
      totalImages={project.images.length}
    >
      <SimpleReactLightbox>
        <div className="project">
          <div className="project-name">
            <div className="project-number">{`${index + 1 < 10 && '0'}${index + 1}`}</div>
            <div>{strings.projects[project.key].name}</div>
            <div className="links">
              {
                project.github &&
                <a href={project.github} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon
                  icon={faGithub}/><span>{strings.github}</span></a>
              }
              { project.link &&
                <a href={project.link} target="_blank" rel="noopener noreferrer"><i
                className="material-icons">public</i><span>{strings.website}</span></a>
              }
            </div>
          </div>
          <Paragraph className="project-description">
            {strings.projects[project.key].description}
          </Paragraph>
          <div className="project-skills">
            {
              project.topSkills.map((skill, i) => {
                return (
                  <Skill key={i} skill={skill} isPeakSkill={true}/>
                )
              })
            }
            {
              project.otherSkills.map((skill, i) => {
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
                  <a key={image} href={image} data-attribute="SRL">
                    <img className="project-image" src={image} alt="Project"/>
                  </a>
                ))
              }
            </div>
          </SRLWrapper>
          <button
            className="arrow arrow-back"
            onClick={onBack}
          >
            <i className="material-icons">arrow_back</i>
          </button>
          <button
            className="arrow arrow-forward"
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
