import React,{Component} from 'react'
import '../css/App.css'

import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';

import CourseHeader from '../components/CourseHeader'
import CourseStudentList from '../components/CourseStudentList1'
import TeacherCourseHeader from '../components/TeacherCourseHeader'

import { Query } from "react-apollo"
import { COURSE_STUDENT_QUERY } from '../ApolloQueries'

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


class TeacherCourseStudents extends Component {

  render() {

    const { course_id } = this.props.location.state
    const { classes } = this.props

    return (
      <>
      <CssBaseline />
      <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} >

      <div style={{marginBottom:50}}>
      <Query query={COURSE_STUDENT_QUERY} variables={{ courseId: course_id }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
            if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
            if (error) return <div> {JSON.stringify(error)} </div>

            const courseToRender = data.course

            const students = []
            courseToRender.students.forEach(function(element) {
              const item =  {
                id: element.id,
                firstName:element.firstName,
                lastName:element.lastName,
                percentCorrect: element.answers.filter(a => a.answerCorrect).length / element.answers.length > 0 ? element.answers.filter(a => a.answerCorrect).length / element.answers.length : 0.0
              }
              students.push(item)
            });

        return (
          <Fade in={!loading}>
              <>
              <div style={{margin:30}}>
              <TeacherCourseHeader courseid={course_id} />
              </div>

              <CourseStudentList students={students} />

              </>
            </Fade>
        )
      }}
    </Query>
    </div>


    </div>
    </>
    )
  }

}


export default TeacherCourseStudents
