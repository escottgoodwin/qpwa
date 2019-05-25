import React from 'react';
import '../css/App.css';

import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';


const CourseHeaderStudent = (props) =>

  <Card style={{marginTop:20,marginLeft:30,marginRight:30,marginBottom:5}}>

  <CardContent>

  <h3>{props.name} - {props.courseNumber}</h3>
  <h5>Time:  {props.time}</h5>
  </CardContent>

  </Card>




export default CourseHeaderStudent
