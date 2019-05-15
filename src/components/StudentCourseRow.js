import React from 'react';
import '../css/App.css';
import { Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const StudentCourseRow = (props) =>

<Segment >
  <div className="course_row">

  <div className="course_cell">
  <h5>
  <Link  to={{
    pathname: "/student_course_dashboard",
    state:
      { course_id: props.id }
    }} >

  {props.name}</Link>
  </h5>
  </div>

  <div className="course_cell">

  {props.time}

  </div>

  <div className="course_cell">

  {props.teachers.map(teacher => teacher.firstName + ' ' + teacher.lastName).join()}

  </div>

  <div className="course_cell">

  Tests: {props.tests.length}

  </div>

  <div className="course_cell">

  {props.institution.name}

  </div>

  </div>

  </Segment >

//  </CardText>

//</Card>


export default StudentCourseRow
