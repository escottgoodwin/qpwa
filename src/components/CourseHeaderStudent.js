import React from 'react';
import '../css/App.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const CourseHeaderStudent = props => {

  const { name, courseNumber, time } = props

  return(
    <Card style={{backgroundColor:'#334667',color:'#e4f1fe',marginTop:20,marginLeft:30,marginRight:30,marginBottom:5}}>

    <CardContent>

    <h3>{name} - {courseNumber}</h3>
    <h5>Time:  {time}</h5>
    </CardContent>

    </Card>
  )
}

export default CourseHeaderStudent
