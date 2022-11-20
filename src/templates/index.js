import React, {useEffect} from 'react';
import {graphql, navigate} from 'gatsby';
import moment from 'moment';

import Home from '../components/ui/home';

const IndexPage = ({data, pageContext}) => {
  useEffect(() => {
    moment.locale(pageContext.locale);
    const previousLang = localStorage.getItem('language');
    if(previousLang && previousLang !== pageContext.locale) {
      const prefix = pageContext.locale === 'en' ? '/fi' : '/';
      navigate(prefix, {replace: true})
    }
  }, [])

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
    workHistory: datoCmsWorkHistorySection(locale: {eq: $locale}) {
      title
      workHistoryList {
        company
        title
        startDate
        endDate
        body
        peakSkills {
          name
        }
        skills {
          name
        }
      }
    }
    education: datoCmsEducationSection(locale: {eq: $locale}) {
      title
      educationList {
        title
        school
        program
        startDate
        endDate
        body
      }
    }
    skills: datoCmsSkillSection(locale: {eq: $locale}) {
      title
      ratlessTopSkillTitle
      ratelessTopSkillBody
      ratelessOtherSkillTitle
      ratelessOtherSkillBody
      ratedTopSkillTitle
      ratedTopSkillBody
      ratedOtherSkillTitle
      ratedOtherSkillBody
      languageSkillTitle
      ratelessTopSkills {
        name
      }
      ratelessOtherSkills {
        name
      }
      ratedOtherSkills {
        rate
        color1 {
          hex
        }
        color2 {
          hex
        }
        skill {
          name
        }
      }
      ratedTopSkills {
        rate
        color1 {
          hex
        }
        color2 {
          hex
        }
        skill {
          name
        }
      }
      languageSkills {
        title
        level
        body
      }
    }
    projects: datoCmsProjectSection(locale: {eq: $locale}) {
      title 
      projects {
        title
        body
        githubLinkName
        githubUrl
        websiteName
        websiteUrl
        peakSkills {
          name
        }
        skills {
          name
        }
      }
    }
    interests: datoCmsInterestSection(locale: {eq: $locale}) {
      title
      interests {
        title
      }
    }
  }
`
