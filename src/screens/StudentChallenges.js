import React,{Component} from 'react'
import '../css/App.css'

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fade from '@material-ui/core/Fade';

import StudentChallengesList from '../components/StudentChallengesList';
import TestHeaderStudent from '../components/TestHeaderStudent'

import { Query } from "react-apollo"
import { TEST_QUERY } from '../ApolloQueries'

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
    //backgroundColor: theme.palette.primary.main,

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
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,

  },
});

class StudentChallenges extends Component {

    render() {

      const { classes } = this.props
      const { testId } = this.props.location.state

      return (

      <main className={classes.main}>
      <CssBaseline />
      <div style={{marginBottom:100}}>

      <Query query={TEST_QUERY} variables={{ test_id: testId }}>
            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div> {JSON.stringify(error)} </div>

              return (

              <Fade in={!loading}>
              <div >

              <TestHeaderStudent classes={classes} {...data.test} />

              <StudentChallengesList  testId={testId} />

              <div style={{margin:10}}>

              <Button
              fullWidth
              variant="contained"
              color="primary"
              size='large'
              className={classes.submit}
              onClick={() => this.props.history.push({
                pathname: `/student_test_dashboard`,
                state: { test_id: testId }
              })}>Test Dashboard</Button>

              </div>

              </div>
              </Fade>

          )
        }}
        </Query>


        </div>
      </main>

      )
    }

  }

export default withStyles(styles)(StudentChallenges)
