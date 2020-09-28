import React from 'react';
import translate from '../../../components/main/translate';
import travels from "../../../data/travels";
import travelMap from "../../../assets/earth-map.svg";
import styled from 'styled-components/macro';

const dots = travels;


const StyledTravelMap = styled.div`
  flex: 1 0 60%;
  
  @media (max-width: ${({theme}) => theme.breakpoints.lgSize}){
    flex: 0 0 100%;
  }

  .map-title{
    color: ${({theme}) => theme.colors.greyText};
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: 300;
    text-align: right;
  }
  .map{
    background-image: url(${travelMap});
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    margin: 0 auto;
    padding-bottom: 52%;
    position: relative;
    background-size: contain;
  }
  .visit-dots {
    position: absolute;
    width: 100%;
    height: 100%;

    .dot {
      position: absolute;
      background: ${({theme}) => theme.colors.blueMapDot};
      border-radius: 50%;
      height: 6px;
      width: 6px;
      display: inline-block;

      &.home-dot{
        background: ${({theme}) => theme.colors.blueHomeDot};

        .gps_ring{
          border-color: ${({theme}) => theme.colors.blueHomeDot} !important;
        }
      }

      .hover-note {
        display: none;

        background: ${({theme}) => theme.colors.blueMapDot};
        border-radius: 3px;

        position: absolute;
        top: -25px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;

        white-space: nowrap;

        padding: ${({theme}) => theme.spaces.baseSize}/6 ${({theme}) => theme.spaces.baseSize}/4;

        font-size: ${({theme}) => theme.fontSizes.fontSizeXXSmall};
        color: white;
        font-family: ${({theme}) => theme.fonts.fontLato};
        font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};

        .hover-arrow {
          position: absolute;
          bottom: -5px;
          left: 50%;
          z-index: 0;

          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;

          transform:  translateX(-50%);
          border-top: 5px solid ${({theme}) => theme.colors.blueMapDot};
        }
      }
      &:hover {
        .hover-note {
          display: initial;
        }
      }
    }

    .gps_ring {
      border: 1px solid ${({theme}) => theme.colors.blueMapDot};
      -webkit-border-radius: 50%;
      height: 12px;
      width: 12px;
      position: relative;
      -webkit-animation: pulsate 1s linear;
      -webkit-animation-iteration-count: infinite;
       opacity: 0.0;
      left: -3px;
      top: -3px;
    }
    @-webkit-keyframes pulsate {
      0% {
        -webkit-transform: scale(0.1, 0.1);
        opacity: 0.0;
      }
      50% {
        opacity: 1.0;
      }
      100% {
        -webkit-transform: scale(1.2, 1.2);
        opacity: 0.0;
      }
    }
  }
  @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
    padding: 0;
    .visit-dots {
      .dot {
        height: 2px;
        width: 2px;
      }
      .gps_ring {
        height: 6px;
        width: 6px;
        left: -2px;
        top: -2px;
      }
    }
  }
`;

const TravelMap = ({strings}) => {
  return(
    <StyledTravelMap>
      <div className="map">
        <div className="visit-dots">
          {
            dots.map( (dot, i) => {
              return(
                <div className={`dot ${dot.isHome ? 'home-dot' : ''}`} style={dot} key={i}>
                  <div className="gps_ring"/>
                  <div className="hover-note">
                    {strings.interests.cities[dot.key]}
                    <div className="hover-arrow"/>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="map-title">{strings.interests.travelling}</div>
    </StyledTravelMap>
  )
};

export default translate(TravelMap);
