import React from 'react';
import '../css/App.css';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';

import Grid from '@material-ui/core/Grid';
import BookIcon from '@material-ui/icons/Book';

import { Microscope } from 'mdi-material-ui'
import Typography from '@material-ui/core/Typography';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';
import orange from '@material-ui/core/colors/orange';
import {Link} from 'react-router-dom'

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


const StudentTestRow1 = (props) =>
  <div style={{margin:15}}>

  <Card onClick={()=>props.history.push({
    pathname: "/student_test_dashboard",
    state:
      { test_id: props.test.id }
    })}
    className={props.classes.card}>

    <CardActionArea>
      {props.test.testType==="CLASS" &&
      <CardContent style={{ backgroundColor:cyan[100]}}>
      <BookIcon style={{ color:cyan[700]}} />
      <h5 style={{color:cyan[700]}}>
      Lecture
      </h5>
      </CardContent>
      }

      {props.test.testType==="LAB" &&
      <CardContent style={{ backgroundColor:teal[100]}}>
      <Microscope style={{color:teal[700]}}/>
      <h5 style={{color:teal[700]}}>
      Lab
      </h5>
      </CardContent>
      }

      <CardContent>
      <Typography className={props.classes.title} color="textSecondary" gutterBottom>
        { dateFormat(props.test.testDate, "dddd, mmmm dS, yyyy") }
      </Typography>

      <h4>
      {props.test.testNumber}
      </h4>

      <h2>
        {props.test.subject}
      </h2>

      <hr />
        <div style={{margin:10}}>
        <Grid container justify="center" spacing={24}>
        <Grid key='Questions' item>

        <h5>  Questions: {props.test.questions.length}</h5>

        </Grid>
        <Grid key='Answers' item>
        <h5>
          Answers: {props.test.questions.map(q => q.questionAnswers.length).reduce((a,b) => a + b, 0)}
          </h5>
        </Grid>
        <Grid key='Panels' item>
        <h5>
          Panels: { props.test.panels.length }
        </h5>
        </Grid>
        </Grid>

        </div>

          <hr/>

          <div>
          <Grid container justify="center" spacing={24}>

          <Grid key='release' item>

          <Button disabled={!props.test.release} variant="outlined">Released</Button>

          </Grid>

          <Grid key='publish' item>

          <Button disabled={!props.test.published} variant="outlined">Published</Button>

          </Grid>
          </Grid>

        </div>

      </CardContent>
      </CardActionArea>
    </Card>

    </div>

export default withRouter(withStyles(styles)(StudentTestRow1))
