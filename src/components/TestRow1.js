import React from 'react';
import '../css/App.css';

import { withRouter } from "react-router";
import {Link} from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import BookIcon from '@material-ui/icons/Book';
import { Microscope } from 'mdi-material-ui'
import Typography from '@material-ui/core/Typography';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';

var dateFormat = require('dateformat')

const styles = {
  card: {
    minWidth: 275,
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
};


const TestRow1 = (props) =>
  <div style={{margin:15}}>
  <Card className={props.classes.card}>

      {props.test.testType==="CLASS" &&
      <CardContent style={{ backgroundColor:cyan[100]}}>
      <BookIcon style={{ color:cyan[700]}} /> <h5 style={{color:cyan[700]}}>
      Lecture
      </h5>
      </CardContent>
      }

      {props.test.testType==="LAB" &&
      <CardContent style={{ backgroundColor:teal[100]}}>
      <Microscope style={{color:teal[700]}}/><h5 style={{color:teal[700]}}>
      Lab
      </h5>
      </CardContent>
      }


      <CardContent>
      <Typography className={props.classes.title} color="textSecondary" gutterBottom>
        { dateFormat(props.test.testDate, "dddd, mmmm dS, yyyy") }
      </Typography>
      <Link  to={{
        pathname: "/test_dashboard",
        state:
          { test_id: props.test.id }
        }} >

        <Typography variant="h5" component="h5">
        {props.test.testNumber} - {props.test.subject}
        </Typography>

        </Link>

        <div style={{margin:10}}>
        <Link  to={{
          pathname: "/challenge_dashboard",
          state:
            {
              test_id: props.test.id }
          }} >

        <Button  color="primary" variant="outlined">
        {props.test.challengeCount} Challenges
        </Button>

        </Link>

           <Link  to={{
               pathname: "/student_performance",
               state:
                 {
                   test_id: props.test.id,
                 course_id:props.courseId }
               }} >

           <Button  color="primary"  variant="outlined">
           Questions: {props.test.questionsCount}
          </Button>

          <Button  color="primary"  variant="outlined">
          Answers: {props.test.answersCount}
         </Button>

          </Link>
          </div>

          <hr/>

          <div>

          <Button disabled={!props.test.release} variant="outlined">Released</Button>

          <Button disabled={!props.test.published} variant="outlined">Published</Button>


        </div>

      </CardContent>
    </Card>
    </div>



export default withStyles(styles)(withRouter(TestRow1))
