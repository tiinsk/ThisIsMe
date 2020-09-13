import React from 'react';
import moment from 'moment';
import { Waypoint } from 'react-waypoint';
import styled from 'styled-components';

const StyledTimeBubble = styled.div`
position: relative;
  .content-box{
    flex: 0 0 50%;
    width: 50%;
    padding: 1rem 4rem;
    @media (max-width: ${({theme}) => theme.breakpoints.mdSize}) {
      width: 100%;
      padding: 2rem 4rem;
    }
    @media (max-width: ${({theme}) => theme.breakpoints.xsSize}) {
      width: 100%;
      padding: 2rem 0rem 2rem 2rem;
    }
    .time-range{
      color: ${({theme}) => theme.colors.greyText};
      font-weight: 500;
      font-size: ${({theme}) => theme.fontSizes.fontSizeLarge};

      .time{
        display: inline-block;
        color: ${({theme}) => theme.colors.greenNEW};
        font-size: ${({theme}) => theme.fontSizes.fontSizeXLarge};
        font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};
        text-transform: capitalize;

        &.start{
          margin-right: 1rem;
        }
        &.end{
          margin-left: 1rem;
        }
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
  .pointer{
    position: absolute;
    top: 0;
    height: 1rem;
    width: 1rem;
    background: ${({theme}) => theme.colors.greenTimeline};
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
    constructor(){
        super();
        this.state = {}
    }

    render() {
        const side = (this.props.index % 2) ? "right" : "left";

        const fromMoment = moment({month: this.props.from.month - 1, year: this.props.from.year});

        let toMoment;
        if (this.props.to.month || this.props.to.year) {
            toMoment = moment({month: this.props.to.month - 1, year: this.props.to.year});
        }

        return (
          <StyledTimeBubble>
              <div className={"pointer" + " " + side}/>
              <Waypoint
                topOffset={"-50%"}
                onEnter={() => {
                    this.setState({entered: true})
                }}
              >
                  <div className={"content-box" + " " + side + " " + (this.state.entered ? "animated fadeInUp" : "")}>
                      <div className="time-range">
                          <div className="time start">{fromMoment.format("MMM ")} {fromMoment.format("YYYY")}</div>
                          <i className="year-line fa fa-angle-right"/>
                          {
                              toMoment ? <div
                                className="time end">{toMoment.format("MMM ")} {toMoment.format("YYYY")}</div> : null
                          }
                      </div>
                      <div className="details">
                          {this.props.children}
                      </div>
                  </div>
              </Waypoint>

          </StyledTimeBubble>
        )
    }
};

export default TimeBubble;
