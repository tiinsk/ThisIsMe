import React from 'react';
import translate from '../../translate.jsx';

const CourseItem = ({strings, data}) => {

  return(
    <div className="course-item">
      <div className="title">
        {strings.education.courses[`${data.faculty}-${data.code}`]}
      </div>
      <div className="description">
        <div className="year">
          {data.year}
        </div>
        <div className="credits">
          {`${data.op} ${strings.op}`}
        </div>
      </div>
    </div>
  )
};

export default translate(CourseItem);
