import React from 'react';
import '../css/App.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const CourseHeaderStudent = (props) =>

  <Card style={{backgroundColor:'#21385b',color:'#e4f1fe',marginTop:20,marginLeft:30,marginRight:30,marginBottom:5}}>

  <CardContent>

  <h3>{props.name} - {props.courseNumber}</h3>
  <h5>Time:  {props.time}</h5>
  </CardContent>

  </Card>

export default CourseHeaderStudent
