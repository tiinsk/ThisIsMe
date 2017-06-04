import React from 'react';

const ContactCard = ({contact}) => {
  return(
    <div className="contact-card">
      <div className="content-box">
        <div className="container">
          <div className="details">
            <div className="detail">
              <div className="icon"><i className="fa fa-user"/></div>
              {contact.name}
            </div>
            <div className="detail">
              <div className="icon"><i className="fa fa-phone"/></div>
              {contact.phone}
            </div>
            <div className="detail">
              <div className="icon"><i className="fa fa-envelope"/></div>
              {contact.email}
            </div>
          </div>
          <div className="icons">
            <a href={contact.github} target="_blank">
              <div className="link">
                <i className="fa fa-github-square"/>
              </div>
            </a>
            <a href={contact.linkedin} target="_blank">
              <div className="link">
                <i className="fa fa-linkedin-square"/>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ContactCard;
