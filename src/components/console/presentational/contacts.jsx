import React from 'react';
import styled from 'styled-components/macro';

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

const Contacts = ({data}) => {

  return (
    <StyledConsoleContacts>
      <div className="detail">
        <span>{divider}</span><span>{divider}</span>
      </div>

      <div className="detail">
        <span>{divider}</span>{data.contacts.phoneLink}<span>{divider}</span>
      </div>
      <div className="detail">
        <span>{divider}</span>{data.contacts.emailLink}<span>{divider}</span>
      </div>

      <div className="detail">
        <span>{divider}</span><span>{divider}</span>
      </div>

      <div className="detail">
        <span>{divider}</span>
        <a href={data.contacts.githubLink} target="_blank" rel="noopener noreferrer">
          {data.contacts.githubLink}
        </a>
        <span>{divider}</span>
      </div>
      <div className="detail">
        <span>{divider}</span>
        <a href={data.contacts.linkedinLink} target="_blank" rel="noopener noreferrer">
          {data.contacts.linkedinLink}
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
