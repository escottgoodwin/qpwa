import React,{Component} from 'react';
import '../css/App.css';
import * as Cookies from "js-cookie"
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

import classNames from 'classnames';
import { Query } from "react-apollo";
import { Link } from 'react-router-dom'
import TestHeaderStudent from '../components/TestHeaderStudent'
import TestStats from '../components/TestStats'
import UserQuestionStats from '../components/UserQuestionStats'
import UserAnswerStats from '../components/UserAnswerStats'
import StudentTestButtons from '../components/StudentTestButtons'

import Error from './Error'
import Loading from './Loading'
import {TEST_QUERY, CHALLENGE_STUDENT_COUNT_QUERY} from '../ApolloQueries';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    minWidth: 275,
    position: 'relative',
  },
});

class StudentTestDashboard extends Component {

  render() {

    const { test_id } = this.props.location.state
    const userId = Cookies.get('userid')
    const { classes } = this.props
    return (
      <main className={classes.main}>
      <CssBaseline />
      <div style={{marginBottom:50}}>

      <Query query={TEST_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div> {JSON.stringify(error)} </div>

              const testToRender = data.test
              const { panels, id } = data.test

          return (
            <Fade in={!loading}>
            <>
            <TestHeaderStudent classes={classes} {...testToRender} />

            <StudentTestButtons userId={userId} {...data.test}/>

            <TestStats classes={classes} test_id={test_id}  {...data.test} />

            <UserQuestionStats classes={classes} testId={test_id}/>

            <UserAnswerStats classes={classes} testId={test_id} />

            </>
            </Fade>
          )
        }}
      </Query>

    </div>
  </main>

      )
    }
  }


export default withStyles(styles)(StudentTestDashboard)
