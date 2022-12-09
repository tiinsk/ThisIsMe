import { graphql } from 'gatsby';

export const headerFragment = graphql`
  fragment HeaderFragment on DatoCmsHeaderSection {
    title
    name
    subtitle
    aboutme
    projects
    skills
    interests
    education
    workhistory
    image {
      gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
      focalPoint {
        x
        y
      }
      alt
    }
  }
`;

export const aboutMeFragment = graphql`
  fragment AboutMeFragment on DatoCmsAboutMeSection {
    title
    printButtonText
    body
    image {
      gatsbyImageData(width: 200, placeholder: BLURRED)
      alt
    }
  }
`;

export const contactFragment = graphql`
  fragment ContactFragment on DatoCmsContact {
    title
    emailLink
    emailName
    githubLink
    githubName
    linkedinLink
    linkedinName
    phoneLink
    phoneName
  }
`;

export const workHistoryFragment = graphql`
  fragment WorkHistoryFragment on DatoCmsWorkHistorySection {
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
`;

export const educationFragment = graphql`
  fragment EducationFragment on DatoCmsEducationSection {
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
`;

export const skillsFragment = graphql`
  fragment SkillsFragment on DatoCmsSkillSection {
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
      image {
        url
      }
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
      image {
        url
      }
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
    image {
      gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
      alt
    }
  }
`;

export const projectsFragment = graphql`
  fragment ProjectsFragment on DatoCmsProjectSection {
    title
    skillsTitle
    linksTitle
    projects {
      title
      body
      githubLinkName
      githubUrl
      websiteName
      websiteUrl
      designName
      designUrl
      peakSkills {
        name
      }
      skills {
        name
      }
      images {
        url
        alt
      }
      thumbnails {
        gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
      }
    }
  }
`;

export const interestsFragment = graphql`
  fragment InterestsFragment on DatoCmsInterestSection {
    title
    interests {
      title
    }
    image {
      gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
      alt
    }
  }
`;
