import React from 'react';
import moment from 'moment';
import {Waypoint} from 'react-waypoint';
import styled from 'styled-components/macro';

import {H2} from '../../../theme/fonts';

const StyledTimeBubble = styled.div`
  position: relative;

  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }

    to {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  .fadeInUp {
    -webkit-animation-name: fadeInUp;
    animation-name: fadeInUp;
  }
  
  .content-box{
    flex: 0 0 50%;
    width: 50%;
    padding: 1rem 4rem;
    
    opacity: 0;
    transform: translate3d(0, 100%, 0);
    
    @media (max-width: ${({theme}) => theme.breakpoints.mdSize}) {
      width: 100%;
      padding: 2rem 4rem;
    }
    @media (max-width: ${({theme}) => theme.breakpoints.xsSize}) {
      width: 100%;
      padding: 2rem 0rem 2rem 2rem;
    }
    .time-range{
      display: inline-flex;
      align-items: center;
      i {
        color: ${({theme}) => theme.UI.colors.greyText};
        font-size: ${({theme}) => theme.fontSizes.fontSizeLarge};
        margin: 0 ${({theme}) => theme.spaces.base(0.2)};
      }
    }
    &.left{
      text-align: right;
      margin-right: 50%;
      @media (max-width: ${({theme}) => theme.breakpoints.mdSize}) {
        margin-right: 0;
        text-align: left;
      }
    }
    &.right{
      margin-left: 50%;
      margin-right: 0;
      @media (max-width: ${({theme}) => theme.breakpoints.mdSize}) {
        margin-left: 0;
      }
      .details{
        order: 2;
      }
      .time{
        order: 1;
      }
    }
  }
  .dot{
    position: absolute;
    top: 0;
    height: 1rem;
    width: 1rem;
    background: ${({theme}) => theme.UI.colors.black};
    border-radius: 50%;
    z-index: 1;
    
    &.left{
      right: calc(50% - 0.5rem);
      @media (max-width: ${({theme}) => theme.breakpoints.mdSize}) {
        left: -0.5rem;
      }
    }
    &.right{
      left: calc(50% - 0.5rem);
      @media (max-width: ${({theme}) => theme.breakpoints.mdSize}) {
        left: -0.5rem;
      }
    }
  }
`;


class TimeBubble extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    const side = (this.props.index % 2) ? 'right' : 'left';

    const fromMoment = moment(this.props.from);

    let toMoment;
    if (this.props.to) {
      toMoment = moment(this.props.to);
    }

    return (
      <Waypoint
        bottomOffset="100px"
        onEnter={() => {
          this.setState({entered: true})
        }}
      >
        <StyledTimeBubble>
          <div className={`dot ${side}`}/>
          <div className={`content-box ${side} ${(this.state.entered ? 'animated fadeInUp' : '')}`}>
            <div className="time-range">
              <H2 className="start">{fromMoment.format('MMM ')} {fromMoment.format('YYYY')}</H2>
              <i className="year-line material-icons">chevron_right</i>
              {
                toMoment ? <H2 className="end">{toMoment.format('MMM ')} {toMoment.format('YYYY')}</H2> : null
              }
            </div>
            <div className="details">
              {this.props.children}
            </div>
          </div>
        </StyledTimeBubble>
      </Waypoint>
    )
  }
};

export default TimeBubble;
