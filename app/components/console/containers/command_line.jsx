import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {parseCommand} from '../../../actions/console_actions';

class CommandLine extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      input: "",
      cursorPosition: 0,
    }
  }

  keyDownHandler(keyCode, value) {
    //console.log(keyCode);
    if(keyCode === 13){
      this.props.parseCommand(value);
    }
    //back <-
    else if(keyCode === 37){
      if(this.state.cursorPosition > 0) {
        this.setState({
          cursorPosition: this.state.cursorPosition - 1
        })
      }
    }
    //forward ->
    else if(keyCode === 39){
      if(this.state.cursorPosition < this.state.input.length) {
        this.setState({
          cursorPosition: this.state.cursorPosition + 1
        })
      }
    }
  };
  render(){
    return(
      <div className="command-line">
        <i className="fa fa-angle-right line-icon"/>
        <input
          className="command-input"
          id="command-input"
          onKeyDown={({keyCode, target}) => this.keyDownHandler(keyCode, target.value) }
          onChange={({target}) => {;
            this.setState({
              input: target.value,
              cursorPosition: this.state.cursorPosition + 1
            })
          }}
        />
        <div
          className="input-line"
        >
          <div>{this.state.input.slice(0,this.state.cursorPosition)}</div>
          <div className="cursor"/>
          <div>{this.state.input.slice(this.state.cursorPosition)}</div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({parseCommand}, dispatch);
}

export default connect(null, mapDispatchToProps)(CommandLine);
