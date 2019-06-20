import React from 'react';
import '../css/App.css';
import { withRouter } from "react-router";

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import BookIcon from '@material-ui/icons/Book';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Microscope } from 'mdi-material-ui'
import Typography from '@material-ui/core/Typography';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';
import deepPurple from '@material-ui/core/colors/deepPurple';
import orange from '@material-ui/core/colors/orange';

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
  <Card onClick={()=>props.history.push({
    pathname: "/teacher_test_dashboard",
    state:
      { test_id: props.test.id }
    })}
    className={props.classes.card} >

    <CardActionArea>

      {props.test.testType==="CLASS" &&
      <CardContent style={{ backgroundColor:cyan[100]}}>
      <BookIcon style={{ color:cyan[700]}} /> <h5 style={{color:cyan[700]}}>
      Lecture
      </h5>
      </CardContent>}

      {props.test.testType==="LAB" &&
      <CardContent style={{ backgroundColor:teal[100]}}>
      <Microscope style={{color:teal[700]}}/><h5 style={{color:teal[700]}}>
      Lab
      </h5>
      </CardContent>}

      <CardContent>
      <Typography className={props.classes.title} color="textSecondary" gutterBottom>
        { dateFormat(props.test.testDate, "dddd, mmmm dS, yyyy") }
      </Typography>

        <Typography variant="h5" component="h5">
        {props.test.testNumber} - {props.test.subject}
        </Typography>

        <div style={{margin:10}}>
        <Grid container justify="center" spacing={24}>
        <Grid key='Questions' item xs={4}>

        <h5> Questions: {props.test.questionsCount}</h5>

        </Grid>
        <Grid key='Answers' item xs={4}>
        <h5>
          Answers: {props.test.answersCount}  </h5>
        </Grid>
        <Grid key='Panels' item xs={4}>
        <h5>
          Panels: {props.test.panelsCount}
        </h5>
        </Grid>
        </Grid>

        </div>

          <hr/>

          <div>

          <Grid container justify="center" spacing={24}>

          <Grid key='Questions' item xs={6}>

          {props.test.release ?
          <Paper style={{margin:10,padding:10,color:deepPurple[800],backgroundColor:deepPurple[100]}} >Released</Paper>
          :
          <Paper style={{margin:10,padding:10,color:'grey'}}>Released</Paper>
          }
          </Grid>

          <Grid key='Questions' item xs={6}>

          {props.test.published ?

            <Paper style={{margin:10,padding:10,color:orange[800],backgroundColor:orange[100]}} >Published</Paper>
            :
            <Paper style={{margin:10,padding:10,color:'grey'}}>Published</Paper>
          }
          </Grid>
          </Grid>
        </div>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>

export default withStyles(styles)(withRouter(TestRow1))
