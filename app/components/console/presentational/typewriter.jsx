import React from 'react';

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
      <div className="typewriter" style={this.props.style}>
        {this.props.text.slice(0, this.state.index)}
      </div>
    )
  }
}

export default Typewriter;
