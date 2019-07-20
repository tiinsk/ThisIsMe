import React from 'react';
import styled from 'styled-components/macro';

import contacts from '../../../data/contacts';

const StyledConsoleContacts = styled.div`
  border-top:  2px solid ${({theme}) => theme.console.colors.green};
  border-bottom: 2px solid ${({theme}) => theme.console.colors.green};
  width: 450px;
  max-width: 100%;
  .detail{
    width: 450px;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    color: white;
    span{
      color: ${({theme}) => theme.console.colors.green};
    }
    a{
      color: ${({theme}) => theme.console.colors.magenta};
    }
  }
`;

const divider = '//';

const Contacts = () => {

  return (
    <StyledConsoleContacts>
      <div className="detail">
        <span>{divider}</span><span>{divider}</span>
      </div>

      <div className="detail">
        <span>{divider}</span>{contacts.name}<span>{divider}</span>
      </div>
      <div className="detail">
        <span>{divider}</span>{contacts.phone}<span>{divider}</span>
      </div>
      <div className="detail">
        <span>{divider}</span>{contacts.email}<span>{divider}</span>
      </div>

      <div className="detail">
        <span>{divider}</span><span>{divider}</span>
      </div>

      <div className="detail">
        <span>{divider}</span>
        <a href={contacts.github} target="_blank" rel="noopener noreferrer">
          {contacts.github}
        </a>
        <span>{divider}</span>
      </div>
      <div className="detail">
        <span>{divider}</span>
        <a href={contacts.linkedin} target="_blank" rel="noopener noreferrer">
          {contacts.linkedin}
        </a>
        <span>{divider}</span>
      </div>

      <div className="detail">
        <span>{divider}</span><span>{divider}</span>
      </div>

    </StyledConsoleContacts>
  )
};

export default Contacts;
