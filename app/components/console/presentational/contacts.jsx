import React from 'react';

import contacts from '../../../data/contacts';
import styled from 'styled-components';

const StyledConsoleContacts = styled.div`
 border-top:  2px solid ${({theme}) => theme.colors.green}
  border-bottom: 2px solid ${({theme}) => theme.colors.green}
  width: 450px;
  max-width: 100%;
  .detail{
    width: 450px;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    color: white;
    span{
      color: ${({theme}) => theme.colors.green}
    }
    a{
      color: ${({theme}) => theme.colors.magenta};
    }
  }
`;

const Contacts = () => {

  return(
    <StyledConsoleContacts>
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

    </StyledConsoleContacts>
  )
};

export default Contacts;
