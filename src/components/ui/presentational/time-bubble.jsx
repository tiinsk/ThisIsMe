import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';
import styled from 'styled-components/macro';

import { H2 } from '../../../theme/fonts';
import { Icon } from '../../icons';

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

  .content-box {
    flex: 0 0 50%;
    width: 50%;
    padding: 1rem 4rem;

    opacity: 0;
    transform: translate3d(0, 100%, 0);

    @media (max-width: ${({ theme }) => theme.breakpoints.mdSize}) {
      width: 100%;
      padding: 2rem 4rem;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.xsSize}) {
      width: 100%;
      padding: 2rem 0rem 2rem 2rem;
    }
    .time-range {
      display: inline-flex;
      align-items: center;
    }
    &.left {
      text-align: right;
      margin-right: 50%;
      @media (max-width: ${({ theme }) => theme.breakpoints.mdSize}) {
        margin-right: 0;
        text-align: left;
      }
    }
    &.right {
      margin-left: 50%;
      margin-right: 0;
      @media (max-width: ${({ theme }) => theme.breakpoints.mdSize}) {
        margin-left: 0;
      }
      .details {
        order: 2;
      }
      .time {
        order: 1;
      }
    }
  }
  .dot {
    position: absolute;
    top: 0;
    height: 1rem;
    width: 1rem;
    background: ${({ theme }) => theme.UI.colors.black};
    border-radius: 50%;
    z-index: 1;

    &.left {
      right: calc(50% - 0.5rem);
      @media (max-width: ${({ theme }) => theme.breakpoints.mdSize}) {
        left: -0.5rem;
      }
    }
    &.right {
      left: calc(50% - 0.5rem);
      @media (max-width: ${({ theme }) => theme.breakpoints.mdSize}) {
        left: -0.5rem;
      }
    }
  }
`;

const TimeBubble = ({ from, to, index, children }) => {
  const [entered, setEntered] = useState(false)
  const side = index % 2 ? 'right' : 'left';

  return (
    <Waypoint
      bottomOffset="100px"
      onEnter={() => {
        setEntered(true)
      }}
    >
      <StyledTimeBubble>
        <div className={`dot ${side}`} />
        <div
          className={`content-box ${side} ${
            entered ? 'animated fadeInUp' : ''
          }`}
        >
          <div className="time-range">
            <H2 className="start">
              {from}
            </H2>
            <Icon type="chevron-right" color="greyText" style={{margin: '0 0.5rem'}}/>
            {to ? (
              <H2 className="end">
                {to}
              </H2>
            ) : null}
          </div>
          <div className="details">{children}</div>
        </div>
      </StyledTimeBubble>
    </Waypoint>
  );
};

export default TimeBubble;
