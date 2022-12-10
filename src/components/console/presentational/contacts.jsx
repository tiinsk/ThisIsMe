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
        <span>{divider}</span>{data.contacts.links[2].title}<span>{divider}</span>
      </div>
      <div className="detail">
        <span>{divider}</span>{data.contacts.links[3].title}<span>{divider}</span>
      </div>

      <div className="detail">
        <span>{divider}</span><span>{divider}</span>
      </div>

      <div className="detail">
        <span>{divider}</span>
        <a href={data.contacts.links[0].url} target="_blank" rel="noopener noreferrer">
          {data.contacts.links[0].url}
        </a>
        <span>{divider}</span>
      </div>
      <div className="detail">
        <span>{divider}</span>
        <a href={data.contacts.links[1].url} target="_blank" rel="noopener noreferrer">
          {data.contacts.links[1].url}
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
