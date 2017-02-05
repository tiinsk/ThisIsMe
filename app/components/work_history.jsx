import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import _ from 'lodash';

import Section from './presentational/section.jsx';
import Row from './presentational/row.jsx';
import Column from './presentational/column.jsx';
import WorkItem from './presentational/work_item.jsx';

import workExperience from '../data/work_experience';
import TimeLine from './presentational/time_line.jsx';
import TimeBubble from './presentational/time_bubble.jsx';

import translate from '../translate.jsx';

import {giveWorkExperienceData} from '../data/data_formatter';

const chartColors = ['#ff8250', '#ffb650', '#ffd650', "#bfff50", '#50c2ff', "#5079ff", "#7850ff", "#b050ff", "#e950ff", "#ff50bc", "#ff5053" ];

const WorkHistory = ({strings, windowWidth}) => {

  const getLabelRenderer = (data) => {
    return ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      let name = strings.skills.skillNames[data[index].name];

      return `${name || data[index].name} (${(percent * 100).toFixed(0)}%)`;
    }
  };

  const getCenterLabelRenderer = (data) => {
    return ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radian = Math.PI / 180;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x  = cx + radius * Math.cos(-midAngle * radian);
      const y = cy  + radius * Math.sin(-midAngle * radian);

      let name = strings.skills.skillNames[data[index].name];
      return (
       <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
         {`${name || data[index].name} (${(percent * 100).toFixed(0)}%)`}
       </text>
       );
    }
  };

  const workData = giveWorkExperienceData();

  let programmingSkills = _.map(workData.programming, (skill, name) => {
    return {
      name,
      value: skill
    };
  });

  let allSkills = _.reduce(workData.all, (prev, skill, name) => {
    if(name !== "tech") {
      prev.push({
        name,
        value: skill
      });
    }
    return prev;
  }, []);

  programmingSkills = _.orderBy(programmingSkills, ['value'], ['desc']);
  allSkills = _.orderBy(allSkills, ['value'], ['desc']);

  let chartWidth, chartHeight, chartInRadius, chartOutRadius, chartOutRadius2;

  switch (windowWidth){
    case "XS":
      chartWidth = 350;
      chartHeight = 160;
      chartInRadius = 50;
      chartOutRadius = 75;
      chartOutRadius2 = 40;
      break;
    case "SM":
      chartWidth = 450;
      chartHeight = 250;
      chartInRadius = 75;
      chartOutRadius = 100;
      chartOutRadius2 = 50;
      break;
    default:
      chartWidth = 750;
      chartHeight = 400;
      chartInRadius = 125;
      chartOutRadius = 175;
      chartOutRadius2 = 100;
      break;

  }

  return (
    <div className="work-history">
      <Section
        titleId="titles.workHistory"
        backgroundColor="#2e3157"
        titleBackgroundColor="rgba(14, 23, 53, 0.5)"
      >
        <Row>
          <Column
            parts={1}
            ofParts={1}
          >
            <div className="pie-chart">
              <PieChart width={chartWidth} height={chartHeight} onMouseEnter={() => {
              }}>
                <Pie
                  data={allSkills}
                  cx={chartWidth/2}
                  cy={chartHeight/2}
                  labelLine={false}
                  innerRadius={chartInRadius}
                  outerRadius={chartOutRadius}
                  fill="#8884d8"
                  label={ windowWidth === "MD" ? getLabelRenderer(allSkills) : getCenterLabelRenderer(allSkills)}
                >
                  {
                    allSkills.map((entry, index) => {
                      return (
                        <Cell key={index} fill={chartColors[index % chartColors.length]}
                              stroke={chartColors[index % chartColors.length]}/>
                      );
                    })
                  }
                </Pie>
                <Pie
                  data={programmingSkills}
                  cx={chartWidth/2}
                  cy={chartHeight/2}
                  labelLine={false}
                  outerRadius={chartOutRadius2}
                  fill="#8884d8"
                  label={getCenterLabelRenderer(programmingSkills)}
                >
                  {
                    programmingSkills.map((entry, index) => {
                      return (
                        <Cell key={index} fill={chartColors[index % chartColors.length]}
                              stroke={chartColors[index % chartColors.length]}/>
                      );
                    })
                  }
                </Pie>
              </PieChart>
            </div>
          </Column>
        </Row>
        <Row>
          <Column
            parts={1}
            ofParts={1}
          >
            <TimeLine>
              {
                [...workExperience.workexp, ...workExperience.otherworkexp].map((workitem, i) => {
                  return (
                    <TimeBubble
                      key={i}
                      from={workitem.from}
                      to={workitem.to}
                      index={i}
                    >
                      <WorkItem
                        data={workitem}
                      />
                    </TimeBubble>
                  )
                })
              }
            </TimeLine>
          </Column>
        </Row>
      </Section>
    </div>
  )
};

export default translate(WorkHistory);
