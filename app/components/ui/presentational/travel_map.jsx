import React from 'react';
import translate from '../../../components/main/translate';

const dots = [
  { left: "78.9%",top: "56.9%"},
  { left: "83.6%",top: "40.4%"},
  { left: "77.2%",top: "53%"},
  { left: "79.5%",top: "48%"},
  { left: "76.9%",top: "48.2%"},
  { left: "82%",top: "63.4%"},
  { left: "81%",top: "41%"},

  { left: "44.9%",top: "20.1%"},
  { left: "49%",top: "28%"},
  { left: "48%",top: "22%"},
  { left: "45.8%",top: "24%"},
  { left: "47.4%",top: "24%"},
  { left: "49.6%",top: "16%"},

  { left: "52%",top: "17%"},
  { left: "53%",top: "32%"},

];


const TravelMap = ({strings}) => {


  return(
    <div className="travel-map">
      <div className="map">
        <div className="visit-dots">
          {
            dots.map( (dot, i) => {
              return(
                <div className="dot" style={dot} key={i}>
                  <div className="gps_ring"></div>
                </div>
              )
            })
          }
          <div className="dot home" style={{ left: "52%",top: "14%"}}>
            <div className="gps_ring"></div>
          </div>
        </div>
      </div>
      <div className="map-title">{strings.interests.travelling}</div>
    </div>
  )
};

export default translate(TravelMap);
