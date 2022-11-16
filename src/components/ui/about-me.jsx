import React from 'react';

import Section from './presentational/section';
import translate from '../main/translate';
import Introduction from '../ui/introduction';
import styled from 'styled-components/macro';

const StyledAboutMe = styled.div`

`;

const AboutMe = ({scrollRef, aboutMe, contacts}) => {

  return (
    <StyledAboutMe ref={scrollRef}>
      <Section
        title={aboutMe.title}
      >
        <Introduction aboutMe={aboutMe} contacts={contacts} />
      </Section>
    </StyledAboutMe>
  )
};

export default translate(AboutMe);

