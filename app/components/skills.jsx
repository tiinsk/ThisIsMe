import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import _ from 'lodash';

import Section from './presentational/section.jsx';
import Skill from './presentational/skill.jsx';
import Row from './presentational/row.jsx';
import Column from './presentational/column.jsx';
import SectionTitle from './presentational/section_title.jsx';
import Project from './presentational/project.jsx';

import skills from '../data/skills';
import {giveWorkExperienceData, giveEducationData, sumEducationAndWorkData} from '../data/data_formatter';

import translate from '../translate.jsx';


const chartColors = ['#ff8250', '#ffb650', '#ffd650', "#bfff50", '#50c2ff', "#5079ff", "#7850ff", "#b050ff", "#e950ff", "#ff50bc", "#ff5053" ];


const Skills = ({strings, windowWidth}) => {
  console.log("work",giveWorkExperienceData());
  console.log("educ",giveEducationData());

  const summedData = sumEducationAndWorkData();

  let programmingSkills = _.map(summedData.programming, (skill, name) => {
    return {
      name,
      value: skill
    };
  });

  let techSkills = _.map(summedData.tech, (skill, name) => {
    return {
      name,
      value: skill
    };
  });

  let allSkills = _.reduce(summedData.all, (prev, skill, name) => {
    if(name !== "tech") {
      prev.push({
        name,
        value: skill
      });
    }
    return prev;
  }, []);

  programmingSkills = _.orderBy(programmingSkills, ['value'], ['desc']);
  techSkills = _.orderBy(techSkills, ['value'], ['desc']);
  allSkills = _.orderBy(allSkills, ['value'], ['desc']);

  const getLabelRenderer = (data) => {
    return ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      let name =strings.skills.skillNames[data[index].name];
      return `${name || data[index].name} (${(percent * 100).toFixed(0)}%)`;
    }
  };

  let chartWidth, chartHeight, chartInRadius, chartOutRadius, chartOutRadius2;

  switch (windowWidth){
    case "XS":
      chartWidth = 350;
      chartHeight = 200;
      chartOutRadius = 75;

      break;
    case "SM":
      chartWidth = 450;
      chartHeight = 300;
      chartOutRadius = 100;
      break;
    default:
      chartWidth = 650;
      chartHeight = 350;
      chartOutRadius = 125;
      break;

  }


  return(
    <div className="skills">
      <Section
        titleId="titles.skills"
        backgroundColor="#464970"
        titleBackgroundColor="rgba(31, 34, 74, 0.62)"
      >
        <Row>
          <Column
            parts={1}
            ofParts={2}
          >
            <div className="pie-charts">
              <div className="chart">
                <PieChart width={chartWidth} height={chartHeight} onMouseEnter={() => {}}>
                  <Pie
                    data={programmingSkills}
                    cx={chartWidth/2}
                    cy={chartHeight/2}
                    labelLine={false}
                    outerRadius={chartOutRadius}
                    fill="#8884d8"
                    label={getLabelRenderer(programmingSkills)}
                  >
                    {
                      programmingSkills.map((entry, index) => {
                        return (
                          <Cell key={index} fill={chartColors[index % chartColors.length]} stroke={chartColors[index % chartColors.length]}/>
                        );
                      })
                    }
                  </Pie>
                </PieChart>
                <div className="description">{strings.skills.programmingSkills}</div>
              </div>
              <div className="chart">
                <PieChart width={chartWidth} height={chartHeight} onMouseEnter={() => {}}>
                  <Pie
                    data={techSkills}
                    cx={chartWidth/2}
                    cy={chartHeight/2}
                    labelLine={false}
                    outerRadius={chartOutRadius}
                    fill="#8884d8"
                    label={getLabelRenderer(techSkills)}
                  >
                    {
                      techSkills.map((entry, index) => {
                        return (
                          <Cell key={index} fill={chartColors[index % chartColors.length]} stroke={chartColors[index % chartColors.length]}/>
                        );
                      })
                    }
                  </Pie>
                </PieChart>
                <div className="description">{strings.skills.techSkills}</div>
              </div>
              <div className="chart">
                <PieChart width={chartWidth} height={chartHeight} onMouseEnter={() => {}}>
                  <Pie
                    data={allSkills}
                    cx={chartWidth/2}
                    cy={chartHeight/2}
                    labelLine={false}
                    outerRadius={chartOutRadius}
                    fill="#8884d8"
                    label={getLabelRenderer(allSkills)}
                  >
                    {
                      allSkills.map((entry, index) => {
                        return (
                          <Cell key={index} fill={chartColors[index % chartColors.length]} stroke={chartColors[index % chartColors.length]}/>
                        );
                      })
                    }
                  </Pie>
                </PieChart>
                <div className="description">{strings.skills.overallSkills}</div>
              </div>
            </div>
          </Column>
          <Column
            parts={1}
            ofParts={2}
          >
            <div className="skill-container">
              <SectionTitle
                titleId="skills.lang_skills.name"
                color={"#9fa2bf"}
                lineColor={"#9fa2bf"}
              />
              <div className="wrapper">
                {
                  skills.lang_skills.map((language, i) => {
                    return (
                      <Skill
                        key={i}
                        rate={language.value}
                        maxRate={5}
                        textLabel={strings.skills.lang_skills.languages[language.language].language}
                        symbol="fa-trophy"
                      />
                    )
                  })
                }
              </div>
            </div>
            <div className="skill-container mt-1">
              <SectionTitle
                titleId="skills.frameworkSkills"
                color={"#9fa2bf"}
                lineColor={"#9fa2bf"}
              />
              <div className="wrapper">
                {
                  skills.frameworkSkills.map((framework, i) => {
                    return (
                      <Skill
                        key={i}
                        rate={framework.value}
                        maxRate={5}
                        textLabel={framework.framework}
                        symbol="fa-trophy"
                      />
                    )
                  })
                }
              </div>
            </div>
            <div className="skill-container mt-1">
              <SectionTitle
                titleId="skills.otherSkills"
                color={"#9fa2bf"}
                lineColor={"#9fa2bf"}
              />
              <div className="wrapper">
                {
                  skills.otherSkills.map( (skill, i) => {
                    return(
                      <div key={i} className="rateless-skill">
                        {strings.skills.skillNames[skill] || skill}
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </Column>
        </Row>
        <Row>
          <Column
            parts={2}
            ofParts={2}
          >
            <div className="projects">
              <SectionTitle
                titleId="skills.ownProjects"
                color={"white"}
                lineColor={"white"}
              />
              {
                skills.projects.map( (project, i) => {
                  return (
                    <Project
                      key={i}
                      project={project}
                    />
                  );
                })
              }
            </div>
          </Column>
        </Row>
      </Section>
    </div>
  )
};

export default translate(Skills);
