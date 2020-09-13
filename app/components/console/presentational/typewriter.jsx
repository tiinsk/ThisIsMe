import React from 'react';
import styled from 'styled-components';

const StyledConsoleTypewriter = styled.div`

`;

class Typewriter extends React.Component{
  constructor(){
    super();
    this.state = {
      index: 0,
    };
  }

  componentDidMount(){
    this.addVisibleText();
  }

  componentWillUnmount(){
    if(this.timeout){
      clearTimeout(this.timeout);
    }
  }

  addVisibleText(){
    this.timeout = setTimeout(() => {
      if(this.state.index < this.props.text.length) {
        this.setState({
          index: this.state.index + 1
        });
        this.addVisibleText();
      }
    }, 100)
  }

  render() {
    return (
      <StyledConsoleTypewriter style={this.props.style}>
        {this.props.text.slice(0, this.state.index)}
      </StyledConsoleTypewriter>
    )
  }
}

export default Typewriter;
