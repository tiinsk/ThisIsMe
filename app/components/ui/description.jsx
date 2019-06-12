import React from 'react';

import Section from './presentational/section';

import translate from '../main/translate';

const Description = ({strings}) => {

  return (
    <div className="work-history">
      <Section
        titleId="titles.introduction"
      >
        <div className="description" dangerouslySetInnerHTML={{__html: strings.introduction}}/>
      </Section>
    </div>
  )
};

export default translate(Description);
