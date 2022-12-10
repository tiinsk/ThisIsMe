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
    links {
      title
      url
      icon
      target
    }
  }
`;

export const workHistoryFragment = graphql`
  fragment WorkHistoryFragment on DatoCmsWorkHistorySection {
    title
    workHistoryList {
      company
      title
      startDate(locale: $locale, formatString: "MMM YYYY")
      endDate(locale: $locale, formatString: "MMM YYYY")
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
      startDate(locale: $locale, formatString: "MMM YYYY")
      endDate(locale: $locale, formatString: "MMM YYYY")
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
      links {
        title
        icon
        url
      }
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


export const ConsoleWorkHistoryFragment = graphql`
    fragment ConsoleWorkHistoryFragment on DatoCmsWorkHistorySection {
        title
        workHistoryList {
            company
            title
            startDate(formatString: "MM/YYYY")
            endDate(formatString: "MM/YYYY")
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

export const ConsoleEducationFragment = graphql`
    fragment ConsoleEducationFragment on DatoCmsEducationSection {
        title
        educationList {
            title
            school
            program
            startDate(formatString: "MM/YYYY")
            endDate(formatString: "MM/YYYY")
            body
        }
    }
`;
