import React from 'react';
import '../css/App.css';

import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const CourseHeaderStudent = (props) =>

  <div style={{padding:'20px'}}>

  <Link  to={{
    pathname: "/student_course_dashboard",
    state:
      { course_id: props.id }
    }} >
    <h2>{props.name} - {props.courseNumber}</h2>
    </Link>

    <h5>Time: {props.time}</h5>
    
  </div>


export default CourseHeaderStudent
