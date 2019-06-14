import React from 'react';
import translate from '../../../components/main/translate';
import travels from "../../../data/travels";

const dots = travels;


const TravelMap = ({strings}) => {
  return(
    <div className="travel-map">
      <div className="map">
        <div className="visit-dots">
          {
            dots.map( (dot, i) => {
              return(
                <div className={`dot ${dot.isHome ? 'home-dot' : ''}`} style={dot} key={i}>
                  <div className="gps_ring"/>
                  <div className="hover-note">
                    {strings.interests.cities[dot.key]}
                    <div className="hover-arrow"/>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="map-title">{strings.interests.travelling}</div>
    </div>
  )
};

export default translate(TravelMap);
