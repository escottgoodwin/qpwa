import React,{Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import '../css/App.css'

import InvitationList from '../components/InvitationList'
import StudentCourseList from '../components/StudentCourseList'
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import green from '@material-ui/core/colors/green';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

import TeacherHeader from '../components/TeacherHeader'

import { Query } from "react-apollo"
import { STUDENT_COURSE_QUERY, NEW_QUESTIONS } from '../ApolloQueries'

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  }
});

class StudentDashboard extends Component {

  render() {
    const userid = sessionStorage.getItem('userid')

    const { history, classes } = this.props

    return (

        <Query query={STUDENT_COURSE_QUERY} variables={{ userid: userid }}>
              {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div> {JSON.stringify(error)} </div>

                const { id, firstName, lastName, invitesSentTo, studentCourses } = data.user
                const activeCourses = new Array(studentCourses.filter(course => !course.deleted))

                return (
                  <Fade in={!loading}>
                    <>

                    <TeacherHeader courses={studentCourses.filter(course => !course.deleted).length} {...data.user}/>

                    <Query query={NEW_QUESTIONS} variables={{ userId: userid }}>
                          {({ loading, error, data }) => {
                            if (loading) return <div style={{height:'10vh',backgroundColor:'#e4f1fe'}} > </div>
                            if (error) return <div> {JSON.stringify(error)} </div>

                            const { count } = data.questions

                            return (
                              <div style={{marginTop:10,marginRight:30,marginLeft:30}}>
                              {count>0 &&

                              <Card onClick={()=>history.push("/new_questions")}
                              className={classes.card}>

                              <div className={classes.details}>
                                <CardContent style={{height:'100%',padding:10, backgroundColor:green[500],color:green[100]}}>
                                  <ContactSupportIcon />
                                </CardContent>
                              </div>

                            <CardActionArea>
                            <CardContent style={{width:'100%',backgroundColor:green[100],color:green[700]}} >
                              <h5 >{count} new questions</h5>
                              </CardContent>
                              </CardActionArea>
                            </Card>


                            }
                            </div>
                            )
                          }}
                        </Query>

                    {invitesSentTo.length>0 &&
                      <div style={{marginTop:10,marginBottom:10,marginRight:30,marginLeft:30}}>

                      <InvitationList userid={id} invites={invitesSentTo}/>
                      </div>
                    }

                      <StudentCourseList  {...activeCourses} />

                    </>
                    </Fade>
              )
            }}
          </Query>
    )
  }
}


export default withStyles(styles)(StudentDashboard)
