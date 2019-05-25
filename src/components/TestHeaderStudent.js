import React,{Component} from 'react';
import {withRouter} from "react-router-dom"
import moment from 'moment'
import '../css/App.css';

import { Link } from 'react-router-dom'
import { Microscope } from 'mdi-material-ui'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import BookIcon from '@material-ui/icons/Book';

import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';


const styles = {
  card: {
    minWidth: 275,
    position: 'relative',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
      height: 0,
      // 16:9
   },
   overlay: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: 'black',
      backgroundColor: 'white'
   }
};

class TestHeaderStudent  extends Component {

  render() {

    const { classes, subject, testNumber, course, testDate, testType, id, history } = this.props

    return (
      <>
  <div style={{paddingTop:20,paddingBottom:20}}>

    <Card onClick={()=> history.push({
      pathname: "/student_course_dashboard",
      state:
        { course_id: course.id }
      })}
      className={classes.card}>
    <CardActionArea>

    <CardContent>
    <div style={{padding:'20px'}}>
    <h4>{course.name} - {course.courseNumber}</h4>
    </div>
    </CardContent>
    </CardActionArea>
    </Card>

    </div>

    <div style={{paddingTop:20,paddingBottom:20}}>

    <Card onClick={()=> history.push({
      pathname: "/student_test_dashboard",
      state:
        { test_id: id }
      })}
      className={classes.card}>

    <CardActionArea>

    {testType==="CLASS" &&
    <CardContent style={{ backgroundColor:cyan[100]}}>
    <BookIcon style={{ color:cyan[700]}} /> <h5 style={{color:cyan[700]}}>
    Lecture
    </h5>
    </CardContent>
    }

    {testType==="LAB" &&
    <CardContent style={{ backgroundColor:teal[100]}}>
    <Microscope style={{color:teal[700]}}/><h5 style={{color:teal[700]}}>
    Lab
    </h5>
    </CardContent>
    }

  <CardContent >
    <h5>
    {testNumber}
    </h5>

        <h2>
      {subject}
        </h2>
      <Typography  variant="h" component="h6" color="textSecondary" gutterBottom>
        { moment(testDate).format('MMMM Do YYYY, h:mm a') }
      </Typography>

  </CardContent>

  </CardActionArea>

  </Card >

  </div>
  </>
)
}

}

export default withRouter(TestHeaderStudent)
