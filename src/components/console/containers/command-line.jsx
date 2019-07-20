import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';

import {parseCommand} from '../../../actions/console_actions';

const StyledConsoleCommandLine = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 1rem;
  
  .line-icon{
    padding: 0 ${({theme}) => theme.spaces.baseSize}/2;
    font-size: ${({theme}) => theme.fontSizes.fontSizeXLarge};

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input-line{
    flex-grow: 1;
    display: flex;
    align-items: center;
    position: relative;
    white-space: pre;
    z-index: 1;
    height: 22px;

    .cursor{
      height: 100%;
      width: 1rem;
      background-color: ${({theme}) => theme.console.colors.green};
      display: inline-block;
      margin: 0 0.2rem;
      animation: blinker 1.5s steps(1, start) infinite;
      
      @keyframes blinker {
        0% { opacity: 1; }
        50% { opacity: 1; }
        100% { opacity: 0; }
      }
    }
    
    @media (max-width: ${({theme}) => theme.breakpoints.smSize}) {
      height: 14px;
      line-height: 14px;
      .cursor {
        width: 7px;
      }
    }
  }
  .command-input{
    background: transparent;
    outline: none;
    position: fixed;
    bottom: 200vh;
    z-index: 0;
    color: transparent;
    pointer-events: none;
  }
`;

class CommandLine extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      input: '',
      cursorPosition: 0,
    }
  }

  keyDownHandler(keyCode, value) {
    if(keyCode === 13){
      this.props.parseCommand(value);
      this.setState({
        input: ''
      });
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
      <StyledConsoleCommandLine>
        <i className="material-icons line-icon">keyboard_arrow_right</i>
        <input
          className="command-input"
          id="command-input"
          onKeyDown={({keyCode, target}) => this.keyDownHandler(keyCode, target.value) }
          value={this.state.input}
          onChange={({target}) => {
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
      </StyledConsoleCommandLine>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({parseCommand}, dispatch);
}

export default connect(null, mapDispatchToProps)(CommandLine);
