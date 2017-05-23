import React from 'react';
import { connect } from 'react-redux';

import translate from '../../translate';
import CommandLine from './containers/command_line';
import Typewriter from './presentational/typewriter';
import Command from './presentational/command';

class ConsoleSite extends React.Component{

  render() {
    return (
      <div className="console-site"
        onClick={() => {
          console.log("click");
          document.getElementById("command-input").focus();
        }}
      >
        <div style={{margin: "0 1rem 1rem 1rem"}}>
          <Typewriter text="Hi there and welcome. You should try typing --help."/>
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
    )
  }
};

function mapStateToProps({commands}) {
  return {
    commands
  }
}


export default connect(mapStateToProps, null)( translate(ConsoleSite));


