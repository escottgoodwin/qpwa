import React,{Component} from 'react';
import '../css/App.css';
import * as Cookies from "js-cookie"
//import { Form, FormGroup, Label, Input, } from 'reactstrap';

import { Query, Mutation } from "react-apollo";

import { withStyles } from '@material-ui/core/styles';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';

import TeacherCourseHeader from '../components/TeacherCourseHeader'
import EditCourseInput from '../components/EditCourseInput'

import { COURSE_QUERY, DELETE_COURSE_MUTATION, TEACHER_DASHBOARD_QUERY } from '../ApolloQueries'

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

class EditCourse extends Component {

render() {
  const { classes } = this.props
  const { course_id  }= this.props.location.state
  const userid = Cookies.get('userid')

  return (

    <main className={classes.main}>
    <div style={{marginBottom:50}}>

    <Query query={COURSE_QUERY} variables={{ courseid: course_id }}>
          {({ loading, error, data }) => {
            if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
            if (error) return <div> {JSON.stringify(error)} </div>

        return (
          <Fade in={!loading}>
          <>
          <TeacherCourseHeader courseid={course_id} />

          <Paper style={{alignItems: 'center',padding:15}}>
            <center>
            <Avatar className={classes.avatar}>
              <ImportContactsIcon />
            </Avatar>
            </center>
          <h2>Edit Course</h2>

            <EditCourseInput {...data.course}/>

            <Mutation
                mutation={DELETE_COURSE_MUTATION}
                variables={{ course_id }}
                onCompleted={data => this._confirm(data)}
                onError={error => this._error(error)}
                refetchQueries={() => { return [{
                  query: TEACHER_DASHBOARD_QUERY,
                  variables: { userid }
                }]
              }}>
                {mutation => (

                  <Button
                  fullWidth
                  variant="contained"
                  size='large'
                  color="secondary"
                  className={classes.submit}
                  onClick={mutation}>
                  Delete
                  </Button>

                )}
              </Mutation>

            </Paper>

          </>
          </Fade>

            )
          }}
        </Query>
        </div>
        </main>

      )
  }


  _confirm = async data => {
    this.props.history.push(`/teacher_dashboard`)
  }
}

export default withStyles(styles)(EditCourse);
