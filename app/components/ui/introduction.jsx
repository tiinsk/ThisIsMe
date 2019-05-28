import React from 'react';
import translate from '../../components/main/translate';
import Section from './presentational/section';

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
