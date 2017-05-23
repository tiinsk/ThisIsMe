import React from 'react';
import translate from '../../translate.jsx';
import Section from './presentational/section.jsx';

const Introduction = ({strings}) => {
  return(
      <Section titleId="titles.introduction">
        <div className="introduction">
          <div className="image-wrapper">
            <div className="own-image"></div>
          </div>

          <div className="description" dangerouslySetInnerHTML={{__html: strings.introduction}}>
          </div>
        </div>
      </Section>

  )
};

export default translate(Introduction);
