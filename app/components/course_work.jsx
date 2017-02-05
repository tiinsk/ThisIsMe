import React from 'react';

import Section from './presentational/section.jsx';
import Row from './presentational/row.jsx';
import Column from './presentational/column.jsx';
import SectionTitle from './presentational/section_title.jsx';
import CourseItem from './presentational/course_item.jsx';
import ThesisItem from './presentational/thesis_item.jsx';
import Synopsis from './presentational/synopsis.jsx';

import education from '../data/education';


const CourseWork = () => {
  return(
    <div>
      <Section
        titleId="titles.courseWork"
        backgroundColor="#46394a"
        titleBackgroundColor="rgba(48, 44, 56, 0.65)"
      >
      <Row>
        <Column
          parts={1}
          ofParts={1}
        >
          <SectionTitle
            titleId="education.bachelor.title"
            color={"#647692"}
            lineColor={"#ff8250"}
          />
          <Synopsis
            majorId="education.bachelor.major"
            minorId="education.bachelor.minor"
            grade={education.bachelor.grade}
          />
        </Column>
      </Row>
      <Row>
        <Column
          parts={1}
          ofParts={2}
        >
          <SectionTitle
            titleId="education.basics"
            color={"#647692"}
            lineColor={"#ff8250"}
          />
          {
            education.bachelor.basics.courses.map((course, i) => {
              return(
                <CourseItem
                  key={i}
                  data={course}
                />
              );
            })
          }
        </Column>
        <Column
          parts={1}
          ofParts={2}
        >
          <SectionTitle
            titleId="education.major"
            color={"#647692"}
            lineColor={"#ff8250"}
          />
          {
            education.bachelor.major.courses.map((course, i) => {
              return(
                <CourseItem
                  key={i}
                  data={course}
                />
              );
            })
          }
          <SectionTitle
            titleId="education.minor"
            color={"#647692"}
            lineColor={"#ff8250"}
          />
          {
            education.bachelor.minor.courses.map((course, i) => {
              return(
                <CourseItem
                  key={i}
                  data={course}
                />
              );
            })
          }
          <SectionTitle
            titleId="education.others"
            color={"#647692"}
            lineColor={"#ff8250"}
          />
          {
            education.bachelor.others.courses.map((course, i) => {
              return(
                <CourseItem
                  key={i}
                  data={course}
                />
              );
            })
          }
          <SectionTitle
            titleId="education.bachelor.thesis.title"
            color={"#647692"}
            lineColor={"#ff8250"}
          />
          <ThesisItem
            titleId="education.bachelor.thesis.name"
            data={education.bachelor.thesis}
          />
        </Column>
      </Row>



      <Row>
        <Column
          parts={1}
          ofParts={1}
        >
          <SectionTitle
            titleId="education.master.title"
            color={"#647692"}
            lineColor={"#ff8250"}
          />
          <Synopsis
            majorId="education.master.major"
            minorId="education.master.minor"
            grade={education.master.grade}
          />
        </Column>
      </Row>
      <Row>
        <Column
          parts={1}
          ofParts={2}
        >
          <SectionTitle
            titleId="education.basics"
            color={"#647692"}
            lineColor={"#ff8250"}
          />
          {
            education.master.basics.courses.map((course, i) => {
              return(
                <CourseItem
                  key={i}
                  data={course}
                />
              );
            })
          }
          <SectionTitle
            titleId="education.major"
            color={"#647692"}
            lineColor={"#ff8250"}
          />
          {
            education.master.major.courses.map((course, i) => {
              return(
                <CourseItem
                  key={i}
                  data={course}
                />
              );
            })
          }
          <SectionTitle
            titleId="education.minor"
            color={"#647692"}
            lineColor={"#ff8250"}
          />
          {
            education.master.minor.courses.map((course, i) => {
              return(
                <CourseItem
                  key={i}
                  data={course}
                />
              );
            })
          }
        </Column>
        <Column
          parts={1}
          ofParts={2}
        >
          <SectionTitle
            titleId="education.others"
            color={"#647692"}
            lineColor={"#ff8250"}
          />
          {
            education.master.others.courses.map((course, i) => {
              return(
                <CourseItem
                  key={i}
                  data={course}
                />
              );
            })
          }
          <SectionTitle
            titleId="education.master.thesis.title"
            color={"#647692"}
            lineColor={"#ff8250"}
          />
          <ThesisItem
            titleId="education.master.thesis.name"
            data={education.master.thesis}
          />
        </Column>
      </Row>
    </Section>
  </div>
  )
};

export default CourseWork;
