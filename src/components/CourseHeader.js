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

style={{marginTop:20,marginLeft:30,marginRight:30,marginBottom:5,opacity:1,
  backgroundSize: 'cover',
  overflow: 'hidden',
  color:'black',
  backgroundImage:`url(${props.image})`}}>

  <CardContent>

    <h3>{props.name} - {props.courseNumber}</h3>

    <h5>Time: {props.time}</h5>

  </CardContent>

</Card>


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
  </>


export default CourseHeader
