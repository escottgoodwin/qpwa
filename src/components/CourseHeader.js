import React from 'react';
import '../css/App.css';

import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const CourseHeader = (props) =>

  <div style={{backgroundColor: '#e4f1fe',marginTop:'2em'}}>
  <Link  to={{
    pathname: "/course_dashboard",
    state:
      { course_id: props.id }
    }} >
    <Typography color='primary' variant="h4" component="h4">
    {props.name} - {props.courseNumber}
    </Typography>
    </Link>
    <Typography variant="h6" component="h6">
    Time: {props.time}
    </Typography>



   <div style={{display:'inline-block',padding:5}}>
     <Link  to={{
       pathname: "/add_test",
       state:
         { course_id: props.id }
       }} >
       <Button color="primary" variant="contained">Add Test</Button>
      </Link>
    </div>

    <div style={{display:'inline-block',padding:5}}>
      <Link  to={{
        pathname: "/course_students",
        state:
          { course_id: props.id }
        }} >
        <Button color="primary" variant="contained">{props.studentsCount} Students</Button>
       </Link>
     </div>

  </div>


export default CourseHeader
