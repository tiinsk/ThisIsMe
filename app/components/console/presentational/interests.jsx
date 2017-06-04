import React from 'react';
import Map from './map';
import SmallMap from './small_map';

const SM_WINDOW_LIMIT = 1100;
const XS_WINDOW_LIMIT = 499;

class Interests extends React.Component {

  constructor(){
    super();
    this.state = {
      windowWidth: "MD"
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    const isExtraSmallWindow= window.innerWidth <= XS_WINDOW_LIMIT;
    const isSmallWindow= window.innerWidth <= SM_WINDOW_LIMIT;

    this.setState({
      windowWidth: isExtraSmallWindow ? "XS" : isSmallWindow ? "SM" : "MD"
    });
  }


  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div className="console-interests">
        <div className="interests-title">{this.props.strings.interests.travelling}</div>
        {
          this.state.windowWidth !== "MD" ?
            <SmallMap/> :
            <Map/>
        }
        <div className="rateless-skills">
          {
            [...this.props.strings.interests.top, ...this.props.strings.interests.middle, ...this.props.strings.interests.lower].map((interest, i) => {
              return (
                <div className="rateless-skill" key={i}>
                  <span className="line">/</span>
                  {interest}
                  <span className="line">/</span>
                </div>
              );
            })
          }
        </div>
      </div>
    )
  }
}

export default Interests;
