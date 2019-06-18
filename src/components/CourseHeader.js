import React from 'react';
import '../css/App.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const CourseHeader = (props) =>
<>
<Card

style={{marginTop:20,marginLeft:30,marginRight:30,marginBottom:5,
  opacity:1,
  backgroundSize: 'cover',
  overflow: 'hidden',
  color:'black',
  backgroundImage:`url(${props.image})`}}>

  <CardContent>
  <div style={{padding:'15px',backgroundColor:'#303030',opacity:.7, color:'white'}}>

    <h3>{props.name} - {props.courseNumber}</h3>

    <h5>Time: {props.time}</h5>
    </div>
  </CardContent>

</Card>

  </>


export default CourseHeader
