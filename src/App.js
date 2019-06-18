import React,{Component }from 'react';
import * as Cookies from "js-cookie"
import { Route, Switch} from 'react-router-dom'
import './css/App.css';
import { withStyles } from '@material-ui/core/styles';
import { messaging, database } from './firebase'
import firebase from 'firebase'

import TeacherDashboard from './screens/TeacherDashboard'
import StudentDashboard from './screens/StudentDashboard'
import AdminDashboard from './screens/AdminDashboard'
import QuandrioDashboard from './screens/QuandrioDashboard'
import SignIn from './screens/SignIn'
import SignOut from './screens/SignOut'
import SignUp from './screens/SignUp'
import SignedUp from './screens/SignedUp'
import SignUpConfirmation from './screens/SignUpConfirmation'
import CourseDashboard from './screens/CourseDashboard'
import StudentCourseDashboard from './screens/StudentCourseDashboard1'
import CourseInvitation from './screens/CourseInvitation'
import AddCourse from './screens/AddCourse'
import EditCourse from './screens/EditCourse'
import TestDashboard from './screens/TestDashboard'
import StudentTestDashboard from './screens/StudentTestDashboard1'
import TestPanels from './screens/TestPanels'
import StudentTestPanels from './screens/StudentTestPanels'
import AddTest from './screens/AddTest'
import EditTest from './screens/EditTest'
import PublishTest from './screens/PublishTest'
import EditPublishTest from './screens/EditPublishTest'
import StudentPerformance from './screens/StudentPerformance'
import StudentTestPerformance from './screens/StudentTestPerformance'
import ChallengeDashboard2 from './screens/ChallengeDashboard3'
import CourseStudents from './screens/CourseStudents'
import InstitutionDashboard from './screens/InstitutionDashboard'
import AddAdministrator from './screens/AddAdministrator'
import AddTeacherQuandrio from './screens/AddTeacherQuandrio'
import EditInstitution from './screens/EditInstitution'
import EditAdministrator from './screens/EditAdministrator'
import PersonnelDashboard from './screens/PersonnelDashboard'
import InstitutionCourse from './screens/InstitutionCourse'
import InstitutionStudents from './screens/InstitutionStudents'
import ChallengeDashboardStudent from './screens/ChallengeDashboardStudent'
import CreateQuestion from './screens/CreateQuestion'
import AnswerQuestion from './screens/AnswerQuestion1'
import ReviewQuestion from './screens/ReviewQuestion1'
import EditQuestion from './screens/EditQuestion'
import QuestionAnswered from './screens/QuestionAnswered'
import ChallengeQuestion from './screens/ChallengeQuestion'
import Challenge from './screens/Challenge'
import EditChallenge from './screens/EditChallenge'
import StudentTestQuestions from './screens/StudentTestQuestions'
import StudentTestAnswers from './screens/StudentTestAnswers'
import StudentTestAllQuestions from './screens/StudentTestAllQuestions'
import StudentChallenges from './screens/StudentChallenges'
import StudentAddPhotos from './screens/StudentAddPhotos'
import TeacherTestDashboard from './screens/TeacherTestDashboard'
import TeacherTestPanels from './screens/TeacherTestPanels'
import TeacherTestAllQuestions from './screens/TeacherTestAllQuestions'
import TeacherReviewQuestion from './screens/TeacherReviewQuestion1'
import TeacherCourseStudents from './screens/TeacherCourseStudents'
import TeacherTestChallenges from './screens/TeacherTestChallenges'
import TeacherTestPerfStudent from './screens/TeacherTestPerfStudent'
import TeacherTestPerfQuestion from './screens/TeacherTestPerfQuestion'
import StudentJoinCourse from './screens/StudentJoinCourse'
import StudentNewQuestions from './screens/StudentNewQuestions'


import Nav1 from './components/Nav1'

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
});

const collection = database.child('notifications')

class App extends Component {

  componentDidMount() {

    const userId = Cookies.get('userid')

    messaging.getToken().then(function(currentToken) {
      if (currentToken) {
        //console.log('token exists')
      } else {
        Notification.requestPermission().then(function(permission) {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
            // TODO(developer): Retrieve an Instance ID token for use with FCM.
            // ...
          } else {
            console.log('Unable to get permission to notify.');
          }
        });

      }
    }).catch(function(err) {
      console.log('An error occurred while retrieving token. ', err);
    });

    messaging.onMessage(payload => {

      const { data, notification } = payload
      const { title, body } = notification

      const { questionId, testId, course, institution, testNumber, subject } = data

      var notificationTitle = title;
      var notificationOptions = {
        body: body,
        icon: '/assets/android-chrome-512x512.png'
      };

      const newNotification = {
        body,
        title,
        added: firebase.database.ServerValue.TIMESTAMP,
        userId,
        testId,
        questionId,
      }

      collection.child(userId).push(newNotification);

    })
}

  render() {

    return (
      <div className="App">
        <Nav1 />
        <div style={{marginTop: '65px',backgroundColor:'#e4f1fe'}}>
        <Switch>
          <Route exact path="/" component={SignIn}/>
          <Route path="/sign_in" component={SignIn}/>
          <Route path="/sign_out" component={SignOut}/>
          <Route path="/sign_up" component={SignUp}/>
          <Route path="/signed_up" component={SignedUp}/>
          <Route path="/confirm/:token/:email" component={SignUpConfirmation}/>
          <Route path="/teacher_dashboard" component={TeacherDashboard}/>
          <Route path="/student_dashboard" component={StudentDashboard}/>
          <Route path="/admin_dashboard" component={AdminDashboard}/>
          <Route path="/quandria_dashboard" component={QuandrioDashboard}/>
          <Route path="/course_dashboard" component={CourseDashboard}/>
          <Route path="/student_course_dashboard" component={StudentCourseDashboard}/>
          <Route path="/add_course" component={AddCourse}/>
          <Route path="/edit_course/" component={EditCourse}/>
          <Route path="/course_invitation/" component={CourseInvitation}/>
          <Route path="/test_dashboard/" component={TeacherTestDashboard}/>
          <Route path="/student_test_dashboard/" component={StudentTestDashboard}/>
          <Route path="/add_test/" component={AddTest}/>
          <Route path="/edit_test/" component={EditTest}/>
          <Route path="/test_panels" component={TestPanels}/>
          <Route path="/student_test_panels" component={StudentTestPanels}/>
          <Route path="/student_performance/" component={StudentPerformance}/>
          <Route path="/student_test_performance/" component={StudentTestPerformance}/>
          <Route path="/challenge_dashboard" component={ChallengeDashboard2}/>
          <Route path="/publish_test" component={PublishTest}/>
          <Route path="/edit_publish_test" component={EditPublishTest}/>
          <Route path="/institution_dashboard" component={InstitutionDashboard}/>
          <Route path="/add_admin" component={AddAdministrator}/>
          <Route path="/add_teacher" component={AddTeacherQuandrio}/>
          <Route path="/edit_admin" component={EditAdministrator}/>
          <Route path="/edit_institution" component={EditInstitution}/>
          <Route path="/personnel_dashboard" component={PersonnelDashboard}/>
          <Route path="/institution_course" component={InstitutionCourse}/>
          <Route path="/institution_students" component={InstitutionStudents}/>
          <Route path="/challenge_student_dashboard" component={ChallengeDashboardStudent}/>
          <Route path="/create_question" component={CreateQuestion}/>
          <Route path="/answer_question" component={AnswerQuestion}/>
          <Route path="/review_question" component={ReviewQuestion}/>
          <Route path="/edit_question" component={EditQuestion}/>
          <Route path="/question_answered" component={QuestionAnswered}/>
          <Route path="/challenge_question" component={ChallengeQuestion}/>
          <Route path="/challenge" component={Challenge}/>
          <Route path="/edit_challenge" component={EditChallenge}/>
          <Route path="/user_questions" component={StudentTestQuestions}/>
          <Route path="/user_answers" component={StudentTestAnswers}/>
          <Route path="/test_questions" component={StudentTestAllQuestions}/>
          <Route path="/student_challenges" component={StudentChallenges}/>
          <Route path="/student_add_photos" component={StudentAddPhotos}/>
          <Route path="/teacher_test_dashboard" component={TeacherTestDashboard}/>
          <Route path="/teacher_test_panels" component={TeacherTestPanels}/>
          <Route path="/teacher_questions" component={TeacherTestAllQuestions}/>
          <Route path="/teacher_question" component={TeacherReviewQuestion}/>
          <Route path="/course_students" component={TeacherCourseStudents}/>
          <Route path="/teacher_challenges" component={TeacherTestChallenges}/>
          <Route path="/teacher_test_students" component={TeacherTestPerfStudent}/>
          <Route path="/teacher_test_questions" component={TeacherTestPerfQuestion}/>
          <Route path="/join_course" component={StudentJoinCourse}/>
          <Route path="/new_questions" component={StudentNewQuestions}/>

        </Switch>

        </div>
      </div>
      )
    }
}

export default withStyles(styles)(App)
