import _ from 'lodash';
import moment from 'moment';

import work_experience from './work_experience';
import education from './education';

const hours_in_work_day = 7.5;
const work_days_in_month = 21;
const months_in_year = 12;

const credit_to_hours = 27;


export const giveWorkExperienceData = () => {
  let experience = {
    programming: {},
    tech: {},
    all: {}
  };

  let workData = _.reduce(work_experience, (data, work_experience_type) => {
      work_experience_type.reduce((prev, workExp) => {

        const from = moment({month: workExp.from.month-1, year: workExp.from.year});

        let to;
        if(workExp.to.month || workExp.to.year ) {
          to = moment({month: workExp.to.month - 1, year: workExp.to.year});
        }
        else{
          to = moment();
        }

        const duration_in_months = to.diff(from, 'months');

        let workPercentage = workExp.workPercentage;
        _.map(workExp.skills.all, (val, key) => {
          if(!prev.all[key]){
            prev.all[key] = [];
          }
          const calculatedVal = val*hours_in_work_day*work_days_in_month*duration_in_months*workPercentage;
          prev.all[key].push(calculatedVal);
        });
        _.map(workExp.skills.tech, (val, key) => {
          if(!prev.tech[key]){
            prev.tech[key] = [];
          }
          const calculatedVal = val*workExp.skills.all.tech*hours_in_work_day*work_days_in_month*duration_in_months*workPercentage;
          prev.tech[key].push(calculatedVal);
        });
        _.map(workExp.skills.programming, (val, key) => {
          if(!prev.programming[key]){
            prev.programming[key] = [];
          }
          const calculatedVal = val*workExp.skills.all.tech*workExp.skills.tech.programming*hours_in_work_day*work_days_in_month*duration_in_months*workPercentage;
          prev.programming[key].push(calculatedVal);
        });
        return prev;
      }, data);
      return data;
  }, experience);
  //console.log("workData",workData);
  return sumArrays(workData);
};

export const giveEducationData = () => {
  let experience = {
    programming: {},
    tech: {},
    all: {}
  };


  experience = calcEdu(experience, education.bachelor.basics.courses);
  experience = calcEdu(experience, education.bachelor.major.courses);
  experience = calcEdu(experience, education.bachelor.minor.courses);
  experience = calcEdu(experience, education.bachelor.others.courses);

  experience = calcEdu(experience, education.master.basics.courses);
  experience = calcEdu(experience, education.master.major.courses);
  experience = calcEdu(experience, education.master.minor.courses);
  experience = calcEdu(experience, education.master.others.courses);

  return sumArrays(experience);

};

export const sumEducationAndWorkData = () => {
  const workData = giveWorkExperienceData();
  const educationData = giveEducationData();

  return _.mergeWith({}, workData, educationData, (workVal, eduVal) => {
    if( workVal && eduVal && typeof workVal === "number" && typeof eduVal === "number"){
      return workVal + eduVal;
    }
  });
};


const calcEdu = (data, courses) => {
  return courses.reduce((prev, course) => {
    //console.log(course);
    let workHours = course.op*credit_to_hours;
    _.map(course.skills.all, (val, key) => {
      if (!prev.all[key]) {
        prev.all[key] = [];
      }
      const calculatedVal = val*workHours;
      prev.all[key].push(calculatedVal);
    });
    _.map(course.skills.tech, (val, key) => {
      if (!prev.tech[key]) {
        prev.tech[key] = [];
      }
      const calculatedVal = val*course.skills.all.tech*workHours;
      prev.tech[key].push(calculatedVal);
    });
    _.map(course.skills.programming, (val, key) => {
      if (!prev.programming[key]) {
        prev.programming[key] = [];
      }
      const calculatedVal = val*course.skills.all.tech*course.skills.tech.programming*workHours;
      prev.programming[key].push(calculatedVal);
    });
    return prev;
  }, data);
};


const sumArrays = (data) => {
  _.forEach(data, (skillCategories, category) => {
    _.forEach(skillCategories, (skill, skillName) => {
      data[category][skillName] = _.sum(skill);
    })
  });
  return data;
};
