import React from 'react';
import ConsoleSite from '../components/console/console-site';
import { graphql } from 'gatsby';
import Layout from '../layout';

const Console = ({ data }) => {
  const consoleData = {
    fi: {
      header: data.headerFI,
      aboutMe: data.aboutMeFI,
      contacts: data.contactsFI,
      workHistory: data.workHistoryFI,
      education: data.educationFI,
      skills: data.skillsFI,
      projects: data.projectsFI,
      interests: data.interestsFI,
    },
    en: {
      header: data.headerEN,
      aboutMe: data.aboutMeEN,
      contacts: data.contactsEN,
      workHistory: data.workHistoryEN,
      education: data.educationEN,
      skills: data.skillsEN,
      projects: data.projectsEN,
      interests: data.interestsEN,
    },
  };

  return (
    <Layout>
      <ConsoleSite data={consoleData} />
    </Layout>
  );
};

export default Console;

export const Head = () => <title>tiina.dev - Console</title>;

export const query = graphql`
  query ConsoleDatoCMSQuery {
    headerFI: datoCmsHeaderSection(locale: { eq: "fi" }) {
      ...HeaderFragment
    }
    aboutMeFI: datoCmsAboutMeSection(locale: { eq: "fi" }) {
      ...AboutMeFragment
    }
    contactsFI: datoCmsContact(locale: { eq: "fi" }) {
      ...ContactFragment
    }
    workHistoryFI: datoCmsWorkHistorySection(locale: { eq: "fi" }) {
      ...ConsoleWorkHistoryFragment
    }
    educationFI: datoCmsEducationSection(locale: { eq: "fi" }) {
      ...ConsoleEducationFragment
    }
    skillsFI: datoCmsSkillSection(locale: { eq: "fi" }) {
      ...SkillsFragment
    }
    projectsFI: datoCmsProjectSection(locale: { eq: "fi" }) {
      ...ProjectsFragment
    }
    interestsFI: datoCmsInterestSection(locale: { eq: "fi" }) {
      ...InterestsFragment
    }
    headerEN: datoCmsHeaderSection(locale: { eq: "en" }) {
      ...HeaderFragment
    }
    aboutMeEN: datoCmsAboutMeSection(locale: { eq: "en" }) {
      ...AboutMeFragment
    }
    contactsEN: datoCmsContact(locale: { eq: "en" }) {
      ...ContactFragment
    }
    workHistoryEN: datoCmsWorkHistorySection(locale: { eq: "en" }) {
      ...ConsoleWorkHistoryFragment
    }
    educationEN: datoCmsEducationSection(locale: { eq: "en" }) {
      ...ConsoleEducationFragment
    }
    skillsEN: datoCmsSkillSection(locale: { eq: "en" }) {
      ...SkillsFragment
    }
    projectsEN: datoCmsProjectSection(locale: { eq: "en" }) {
      ...ProjectsFragment
    }
    interestsEN: datoCmsInterestSection(locale: { eq: "en" }) {
      ...InterestsFragment
    }
  }
`;
