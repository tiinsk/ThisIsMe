import React from 'react';

import Section from './presentational/section';

import translate from '../main/translate';
import Introduction from "../ui/introduction";

const AboutMe = ({strings, scrollRef}) => {
  return (
    <div className="about-me" ref={scrollRef}>
      <Section
        titleId="titles.aboutMe"
      >
        <Introduction/>
      </Section>
    </div>
  )
};

export default translate(AboutMe);
