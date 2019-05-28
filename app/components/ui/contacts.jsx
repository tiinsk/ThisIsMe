import React from 'react';

import ContactCard from './presentational/contact_card';
import translate from '../main/translate';

import contacts from '../../data/contacts';

const Contacts = ({strings}) => {

  return(
    <div className="contacts">
      <div className="title">{strings.titles.contacts}</div>
      <ContactCard
        contact={contacts}
      />
    </div>
  )
};

export default translate(Contacts);
