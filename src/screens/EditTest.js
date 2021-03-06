import React,{Component} from 'react';
import '../css/App.css';
//import { Form, FormGroup, Label, Input, } from 'reactstrap';

import { Query } from "react-apollo";

import { withStyles } from '@material-ui/core/styles';

import Fade from '@material-ui/core/Fade';

import TestHeaderTeacher from '../components/TestHeaderTeacher'
import EditTestInput from '../components/EditTestInput'

import {TEST_QUERY} from '../ApolloQueries'

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
      width: 600,
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

class EditTest extends Component {

render() {
  const { classes } = this.props
  const { test_id }= this.props.location.state

  return (
    <main className={classes.main}>

    <div style={{marginBottom:50}}>

    <Query query={TEST_QUERY} variables={{ test_id }}>
          {({ loading, error, data }) => {
            if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
            if (error) return <div> {JSON.stringify(error)} </div>

        return (
          <Fade in={!loading}>
          <>
          <TestHeaderTeacher classes={classes} {...data.test} />

          <EditTestInput {...data.test}/>

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

export default withStyles(styles)(EditTest);
