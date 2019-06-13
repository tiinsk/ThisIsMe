import React from 'react';

import Section from './presentational/section';

import translate from '../main/translate';

const Description = ({strings, scrollRef}) => {
  return (
    <div className="work-history" ref={scrollRef}>
      <Section
        titleId="titles.introduction"
      >
        <div className="description" dangerouslySetInnerHTML={{__html: strings.introduction}}/>
      </Section>
    </div>
  )
};

export default translate(Description);
