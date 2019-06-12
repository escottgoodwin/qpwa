import React from 'react';
import '../css/App.css';

import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const CourseHeader = (props) =>
<>
<Card

style={{marginTop:20,marginLeft:30,marginRight:30,marginBottom:5,
  opacity:.8,
  backgroundSize: 'cover',
  overflow: 'hidden',
  color:'black',
  backgroundImage:`url(${props.image})`}}>

  <CardContent>

    <h3>{props.name} - {props.courseNumber}</h3>

    <h5>Time: {props.time}</h5>

  </CardContent>

</Card>

  </>


export default CourseHeader
