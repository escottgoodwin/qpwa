import React,{Component} from 'react';
import '../css/App.css';
import * as Cookies from "js-cookie"
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import TestHeaderTeacher from '../components/TestHeaderTeacher'
import TestStats from '../components/TestStats'
import TeacherTestButtons from '../components/TeacherTestButtons'
import TeacherTestStudents from '../components/TeacherTestStudents'
import TeacherTestQuestions from '../components/TeacherTestQuestions'
import TeacherQuestionButtons from '../components/TeacherQuestionButtons'


import { Query } from "react-apollo";
import { TEST_QUERY } from '../ApolloQueries';

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

class TeacherTestDashboard extends Component {

  render() {

    const { test_id } = this.props.location.state
    const userId = Cookies.get('userid')
    const { classes } = this.props

    return (

      <Query query={TEST_QUERY} variables={{ test_id: test_id }} fetchPolicy="cache-and-network">

            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div> {JSON.stringify(error)} </div>

              const { panels } = data.test

          return (
            <Fade in={!loading}>
            <div style={{marginLeft:'5%',marginRight:'5%',marginBottom:20}}>
            <TestHeaderTeacher classes={classes} {...data.test} />

            <TeacherTestButtons userId={userId} {...data.test}/>

            <TestStats classes={classes} test_id={test_id}  {...data.test} />

            <TeacherTestStudents classes={classes} test_id={test_id}  {...data.test} />

            <TeacherTestQuestions classes={classes} test_id={test_id}  {...data.test} />

            {panels.length>0 &&
              <TeacherQuestionButtons {...data.test}/>
            }


            <Link  to={{
              pathname: "/edit_test",
              state:
                {
                  test_id }
              }} >
            <Button  style={{marginTop:20}} fullWidth size='large' variant='contained' color="primary" >Edit Test</Button>

            </Link>

            </div>
          </Fade>
          )
        }}
      </Query>

      )
    }
  }

export default withStyles(styles)(TeacherTestDashboard)
