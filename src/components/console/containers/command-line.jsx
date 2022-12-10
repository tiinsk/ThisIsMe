import React, {useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';

import {parseCommand} from '../../../actions/console_actions';
import { Icon } from '../../icons';

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

const CommandLine = ({parseCommand, inputRef}) => {
  const [input, setInput] = useState('')
  const [cursorPosition, setCursorPosition] = useState(0)

  const keyDownHandler = (keyCode, value) => {
    if(keyCode === 13){
      parseCommand(value);
      setInput('')
    }
    //back <-
    else if(keyCode === 37){
      if(cursorPosition > 0) {
        setCursorPosition(cursorPosition - 1)
      }
    }
    //forward ->
    else if(keyCode === 39){
      if(cursorPosition < input.length) {
        setCursorPosition(cursorPosition + 1)
      }
    }
  };

  return(
    <StyledConsoleCommandLine>
      <Icon type="chevron-right" subTheme="console" color="green" size="2rem"/>
      <input
        className="command-input"
        id="command-input"
        ref={inputRef}
        onKeyDown={({keyCode, target}) => keyDownHandler(keyCode, target.value) }
        value={input}
        onChange={({target}) => {
          setInput(target.value)
          setCursorPosition(cursorPosition + 1)
        }}
      />
      <div
        className="input-line"
      >
        <div>{input.slice(0, cursorPosition)}</div>
        <div className="cursor"/>
        <div>{input.slice(cursorPosition)}</div>
      </div>
    </StyledConsoleCommandLine>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({parseCommand}, dispatch);
}

export default connect(null, mapDispatchToProps)(CommandLine);
