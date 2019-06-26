import React,{Component} from 'react'
import '../css/App.css'
import { Link } from 'react-router-dom'

import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import CourseHeaderStudent from '../components/CourseHeaderStudent'
import StudentTestList from '../components/StudentTestList'

import { Query } from "react-apollo"
import { COURSE_QUERY } from '../ApolloQueries'

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

class StudentCourseDashboard extends Component {

  render() {

    const { course_id } = this.props.location.state

    return (

      <>
      <CssBaseline />
      <div style={{marginBottom:50}}>

      <Query query={COURSE_QUERY} variables={{ courseid: course_id }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div> {JSON.stringify(error)} </div>

              const { course } = data
              const tests1 = course.tests.filter(test => !test.deleted && test.published)

          return (
            <Fade in={!loading}>
              <div >
              <CourseHeaderStudent {...course} />

              <div style={{marginTop:20, marginRight:30, marginLeft:30}}>
              <Link  to={{
                pathname: "/add_test",
                state:
                  {
                    course_id }
                }} >
                <Button  fullWidth size='large' variant='contained' color="primary" >Add Test</Button>
              </Link>
              </div>

              <StudentTestList tests={tests1} courseId={course_id} />
            </div>
            </Fade >
        )
      }}
    </Query>

    </div>
    </>

    )
  }

}


export default withStyles(styles)(StudentCourseDashboard)
