import React,{Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import '../css/App.css'
import { Query } from "react-apollo"
import { Link } from 'react-router-dom'

import InvitationList from '../components/InvitationList'
import StudentCourseList from '../components/StudentCourseList'
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import green from '@material-ui/core/colors/green';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

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
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

class StudentDashboard extends Component {

  render() {
    const userid = sessionStorage.getItem('userid')
    const questionId = 'cjuub450n01bb0751keow7kjv'

    const { history, classes } = this.props

    const answerId = 'cjunbxcu800dx0734t8cq9arz'
    const testId = 'cjuub0c8j00x707512cybsukb'

    return (

        <Query query={STUDENT_COURSE_QUERY} variables={{ userid: userid }}>
              {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div> {JSON.stringify(error)} </div>

                const userToRender = data.user
                const studentCourses = new Array(userToRender.studentCourses.filter(course => !course.deleted))
                console.log(userToRender.invitesSentTo)
                return (
                  <Fade in={!loading}>
                    <>
                    <h4 >Welcome {userToRender.firstName} {userToRender.lastName}</h4>

                    <Query query={NEW_QUESTIONS} variables={{ userId: userid }}>
                          {({ loading, error, data }) => {
                            if (loading) return <div style={{height:'10vh',backgroundColor:'#e4f1fe'}} > </div>
                            if (error) return <div> {JSON.stringify(error)} </div>

                            const { count } = data.questions

                            return (
                              <div style={{marginRight:35,marginLeft:35}}>
                              {count &&

                              <Card onClick={()=>history.push({
                                pathname: "/new_questions",
                                state:
                                  {  }
                                })}
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



                    {userToRender.invitesSentTo.length>0 &&
                      <div style={{marginTop:10,marginBottom:10,marginRight:35,marginLeft:35}}>

                      <InvitationList userid={userToRender.id} invites={userToRender.invitesSentTo}/>
                      </div>
                    }

                      <StudentCourseList  {...studentCourses} />

                    </>
                    </Fade>
              )
            }}
          </Query>
    )
  }
}


export default withStyles(styles)(StudentDashboard)
