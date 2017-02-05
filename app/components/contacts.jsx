import React from 'react';

import Section from './presentational/section.jsx';
import ContactCard from '../components/presentational/contact_card.jsx';
import translate from '../translate.jsx';

import contacts from '../data/contacts';

const Interests = ({strings}) => {

  return(
    <div className="contacts">
      <Section
        titleId="titles.contacts"
        backgroundColor="#1f1e3c"
        titleBackgroundColor="rgba(12, 11, 39, 0.5)"
      >
        <ContactCard
          contact={contacts}
        />
      </Section>
    </div>
  )
};

export default translate(Interests);
