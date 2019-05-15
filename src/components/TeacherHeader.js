import React from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const TeacherHeader = (props) =>
  <div style={{backgroundColor: '#e4f1fe',marginTop:'2em',marginBottom:'2em'}}>
  <h3>{props.firstName} {props.lastName}'s Courses</h3>

  <Link  to="/add_course"><Button color='primary' variant='contained'>Add Course</Button></Link>

  </div>

export default TeacherHeader
