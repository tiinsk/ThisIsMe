import React from 'react';

import contacts from '../../../data/contacts';

const Contacts = () => {

  return(
    <div className="console-contacts">
      <div className="detail">
        <span>//</span><span>//</span>
      </div>

      <div className="detail">
        <span>//</span>{contacts.name}<span>//</span>
      </div>
      <div className="detail">
        <span>//</span>{contacts.phone}<span>//</span>
      </div>
      <div className="detail">
        <span>//</span>{contacts.email}<span>//</span>
      </div>

      <div className="detail">
        <span>//</span><span>//</span>
      </div>

      <div className="detail">
        <span>//</span>
        <a href={contacts.github} target="_blank">
          {contacts.github}
        </a>
        <span>//</span>
      </div>
      <div className="detail">
        <span>//</span>
        <a href={contacts.linkedin} target="_blank">
          {contacts.linkedin}
        </a>
        <span>//</span>
      </div>

      <div className="detail">
        <span>//</span><span>//</span>
      </div>

    </div>
  )
};

export default Contacts;
