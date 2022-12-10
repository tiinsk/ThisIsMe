import React, { useEffect } from 'react';
import { graphql, navigate } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';

import Home from '../components/ui/home';
import Layout from '../layout';

const IndexPage = ({ data, pageContext }) => {
  useEffect(() => {
    const previousLang = localStorage.getItem('language');
    if (previousLang && previousLang !== pageContext.locale) {
      const prefix = pageContext.locale === 'en' ? '/fi' : '/';
      navigate(prefix, { replace: true });
    }
  }, []);

  return (
    <Layout>
      <HelmetDatoCms favicon={data.site.faviconMetaTags} />
      <Home data={data} />
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>tiina.dev</title>;

export const query = graphql`
  query DatoCMSQuery($locale: String!) {
    header: datoCmsHeaderSection(locale: { eq: $locale }) {
      ...HeaderFragment
    }
    aboutMe: datoCmsAboutMeSection(locale: { eq: $locale }) {
      ...AboutMeFragment
    }
    contacts: datoCmsContact(locale: { eq: $locale }) {
      ...ContactFragment
    }
    workHistory: datoCmsWorkHistorySection(locale: { eq: $locale }) {
      ...WorkHistoryFragment
    }
    education: datoCmsEducationSection(locale: { eq: $locale }) {
      ...EducationFragment
    }
    skills: datoCmsSkillSection(locale: { eq: $locale }) {
      ...SkillsFragment
    }
    projects: datoCmsProjectSection(locale: { eq: $locale }) {
      ...ProjectsFragment
    }
    interests: datoCmsInterestSection(locale: { eq: $locale }) {
      ...InterestsFragment
    }
    site: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
  }
`;
