import React from 'react';
import '../css/App.css';

import StudentCourseRow1 from './StudentCourseRow1'

const StudentCourseList = (props) =>
<div>

  <div className="coursecontainer">
    {props[0].map(course =>
      <StudentCourseRow1 key={course.id} {...course} />
    )}
  </div>
    </div>

export default StudentCourseList
