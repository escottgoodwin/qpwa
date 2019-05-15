import React from 'react';
import '../css/App.css';

import { Link } from 'react-router-dom'

const StudentCourseHeader = (props) =>

<>
  <Link  to={{
    pathname: "/student_course_dashboard",
    state:
      { course_id: props.id }
    }} >
    <div style={{padding:10}}>
    <h2>{props.name} - {props.courseNumber}</h2>
    </div>
    </Link>

    <div style={{padding:10}}>
    <h5>Time: {props.time}</h5>
    </div>
</>


export default StudentCourseHeader
