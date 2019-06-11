import React from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const TeacherHeader = (props) =>

  <Paper style={{opacity:1,padding:20,marginTop:20,marginLeft:30,marginRight:30,marginBottom:5}}>

    <h3>{props.firstName} {props.lastName}'s Courses</h3>

  <h5>Total Courses: {props.courses}</h5>
  </Paper >

export default TeacherHeader
