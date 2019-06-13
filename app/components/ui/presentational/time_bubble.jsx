import React from 'react';
import moment from 'moment';
import { Waypoint } from 'react-waypoint';

class TimeBubble extends React.Component {
    constructor(){
        super();
        this.state = {}
    }

    render() {
        const side = (this.props.index % 2) ? "right" : "left";

        const fromMoment = moment({month: this.props.from.month - 1, year: this.props.from.year});

        let toMoment;
        if (this.props.to.month || this.props.to.year) {
            toMoment = moment({month: this.props.to.month - 1, year: this.props.to.year});
        }

        return (
          <div className="time-bubble">
              <div className={"pointer" + " " + side}/>
              <Waypoint
                topOffset={"-50%"}
                onEnter={() => {
                    this.setState({entered: true})
                }}
              >
                  <div className={"content-box" + " " + side + " " + (this.state.entered ? "animated fadeInUp" : "")}>
                      <div className="time-range">
                          <div className="time start">{fromMoment.format("MMM ")} {fromMoment.format("YYYY")}</div>
                          <i className="year-line fa fa-angle-right"/>
                          {
                              toMoment ? <div
                                className="time end">{toMoment.format("MMM ")} {toMoment.format("YYYY")}</div> : null
                          }
                      </div>
                      <div className="details">
                          {this.props.children}
                      </div>
                  </div>
              </Waypoint>

          </div>
        )
    }
};

export default TimeBubble;
