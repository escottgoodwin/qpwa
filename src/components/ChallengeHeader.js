import React from 'react';
import '../css/App.css';
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'

const ChallengeHeader = (props) =>

  <div>
  <Link  to={{
    pathname: "/course_dashboard",
    state:
      { course_id: props.course.id }
    }} >

  <h2>{props.course.name} - {props.course.courseNumber}</h2></Link>

  <hr/>

  <Link  to={{
    pathname: "/test_dashboard",
    state:
      { test_id: props.id }
    }} >

  <h3>{props.testNumber} - {props.subject} - { dateFormat(props.testDate, "dddd, mmmm dS, yyyy") }</h3></Link>
  </div>


export default ChallengeHeader
