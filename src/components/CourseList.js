import React from 'react';
import '../css/App.css';

import CourseRow1 from './CourseRow1'

const CourseList = (props) =>
<div>

  <div className="coursecontainer">
    {props[0].map(course =>
      <CourseRow1 key={course.id} {...course} />
    )}
  </div>
    </div>

export default CourseList
