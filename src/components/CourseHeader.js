import React from 'react';
import '../css/App.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const CourseHeader = (props) =>
<>
<Card
style={{backgroundColor:'#334667',color:'#e4f1fe',marginTop:20,marginLeft:30,marginRight:30,marginBottom:5}}>

  <CardContent>
  <div style={{padding:'15px'}}>

    <h3>{props.name} - {props.courseNumber}</h3>

    <h5>Time: {props.time}</h5>
    </div>
  </CardContent>

</Card>

  </>


export default CourseHeader
