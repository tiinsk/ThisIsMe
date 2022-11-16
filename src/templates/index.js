import React from 'react';
import {graphql} from 'gatsby';

import Home from '../components/ui/home';

const IndexPage = ({data}) => {
  console.log(data)
  return (
    <Home data={data}/>
  );
}

export default IndexPage;

export const Head = () => <title>tiina.dev</title>

export const query = graphql`
  query DatoCMSQuery($locale: String!) {
    header: datoCmsHeaderSection(locale: { eq: $locale }) {
      title
      name
      subtitle
      aboutme
      projects
      skills
      interests
      education
      workhistory
    }
    aboutMe: datoCmsAboutMeSection(locale: { eq: $locale }) {
      title
      printButtonText
      body
    }
    contacts: datoCmsContact(locale: { eq: $locale }) {
      emailLink
      emailName
      githubLink
      githubName
      linkedinLink
      linkedinName
      phoneLink
      phoneName
    }
  }
`
