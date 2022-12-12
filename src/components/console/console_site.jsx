import React from 'react';
import { connect } from 'react-redux';

import translate from '../main/translate';
import CommandLine from './containers/command_line';
import Typewriter from './presentational/typewriter';
import Command from './presentational/command';
import {helpCommand} from '../../actions/console_actions';

import styled from 'styled-components/macro';

const StyledConsoleSite = styled.div`
background: ${({theme}) => theme.colors.almostBlack};
  min-height: 100vh;

  .console-site {
    max-width: 1200px;

    color: ${({theme}) => theme.colors.green}
    font-family: ${({theme}) => theme.fonts.fontSpaceMono};
    padding: 2rem 1rem;
    padding-bottom: 2rem;

    font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};

    @media (max-width: ${({theme}) => theme.breakpoints.mdSize}) {
      font-size: 1.1rem;
    }
    @media (max-width: ${({theme}) => theme.breakpoints.smSize}) {
      font-size: 1.0rem;
    }
    @media (max-width: ${({theme}) => theme.breakpoints.xsSize}) {
      font-size: 0.8rem;
    }
    ::selection {
      background: ${({theme}) => theme.colors.green}
      color: white;
    }

    ::-moz-selection {
      background: ${({theme}) => theme.colors.green}
      color: white;
    }
    .rateless-skills {
      display: flex;
      margin: 1rem 0;
      flex-wrap: wrap;
      .rateless-skill {
        color: white;
        margin-right: 1rem;
        .line {
          color: ${({theme}) => theme.colors.magenta};
        }
      }
    }
  }
`;

class ConsoleSite extends React.Component{

  componentDidMount(){
    document.getElementById("command-input").focus();
  }

  render() {
    return (
      <StyledConsoleSite>
        <div className="console-site"
          onClick={() => {
            document.getElementById("command-input").focus();
          }}
        >
          <div style={{margin: "0 1rem 1rem 1rem"}}>
            <Typewriter text={`Hi there and welcome. You should try typing "${helpCommand}".`}/>
          </div>
          {
            this.props.commands.map((cmd, i) => {
              return(
                <Command
                  key={i}
                  command={cmd}
                />
              );
            })
          }
          <CommandLine/>
        </div>
      </StyledConsoleSite>
    )
  }
};

function mapStateToProps({commands}) {
  return {
    commands
  }
}


export default connect(mapStateToProps, null)( translate(ConsoleSite));


