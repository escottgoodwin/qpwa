import React from 'react';
import '../css/App.css';

import { Link } from 'react-router-dom'

const AddTestHeader = (props) =>

  <div>

  <Link  to={{
    pathname: "/course_dashboard",
    state:
      { course_id: props.id }
    }} >

  <h4>{props.name} - {props.courseNumber}</h4></Link>
  <h5>Time: {props.time}</h5>
  </div>


export default AddTestHeader
