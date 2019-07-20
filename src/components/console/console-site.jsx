import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components/macro';

import {helpCommand} from '../../actions/console_actions';
import translate from '../main/translate';
import CommandLine from './containers/command-line';
import Command from './presentational/command';
import Typewriter from './presentational/typewriter';

const StyledConsoleSite = styled.div`
  background: ${({theme}) => theme.UI.colors.almostBlack};

  .console-site {
    max-width: 1200px;
    min-height: 100vh;

    color: ${({theme}) => theme.console.colors.green};
    font-family: ${({theme}) => theme.fonts.fontSourceCode};
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
      background: ${({theme}) => theme.console.colors.green};
      color: white;
    }

    ::-moz-selection {
      background: ${({theme}) => theme.console.colors.green};
      color: white;
    }
    
    a {
      text-transform: none;
      font-family: ${({theme}) => theme.fonts.fontSourceCode};
      font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
      &:hover {
        text-decoration: underline;
      }
    }
    
    .rateless-skills {
      display: flex;
      margin: 1rem 0;
      flex-wrap: wrap;
      .rateless-skill {
        color: white;
        margin-right: 1rem;
        .line {
          color: ${({theme}) => theme.console.colors.magenta};
        }
        .asterix {
          color: ${({theme}) => theme.console.colors.yellow};
        }
    }
  }
`;

class ConsoleSite extends React.Component {

  componentDidMount() {
    document.getElementById('command-input').focus();
  }

  render() {
    return (
      <StyledConsoleSite>
        <div className="console-site"
             onClick={() => {
               document.getElementById('command-input').focus();
             }}
        >
          <div style={{margin: '0 1rem 1rem 1rem'}}>
            <Typewriter text={`Hi there and welcome. You should try typing "${helpCommand}".`}/>
          </div>
          {
            this.props.commands.map((cmd, i) => {
              return (
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


export default connect(mapStateToProps, null)(translate(ConsoleSite));


