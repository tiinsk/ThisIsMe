import React from 'react';
import Map from './map';
import SmallMap from './small_map';

const SM_WINDOW_LIMIT = 800;
import styled from 'styled-components';

const StyledConsoleInterests = styled.div`
.interests-title{
    color: ${({theme}) => theme.colors.magenta};
  }
`;

class Interests extends React.Component {

  constructor(){
    super();
    this.state = {
      windowWidth: "MD"
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    const isSmallWindow= window.innerWidth <= SM_WINDOW_LIMIT;

    this.setState({
      windowWidth: isSmallWindow ? "SM" : "MD"
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
      <StyledConsoleInterests>
        <div className="interests-title">{this.props.strings.interests.travelling}</div>
        {
          this.state.windowWidth !== "MD" ?
            <SmallMap/> :
            <Map/>
        }
        <div className="rateless-skills">
          {
            this.props.strings.interests.interest_list.map((interest, i) => {
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
      </StyledConsoleInterests>
    )
  }
}

export default Interests;
