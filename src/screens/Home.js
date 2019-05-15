import React from 'react';
import {Route,Switch} from 'react-router-dom'

import TeacherDashboard from './TeacherDashboard'
import SignIn from './SignIn'
import CourseDashboard from './CourseDashboard'
import TestDashboard from './TestDashboard'
import AddTest from './AddTest'
import AddCourse from './AddCourse'
import AddPanels from './AddPanels'
import Main from './Main'
import StudentPerformance from './StudentPerformance'
import Challenges from './Challenges'
import SelectPanels from './SelectPanels'

const Home = () =>
<div>
  <Switch>
  <Route path="/main" component={Main}/>
  <Route path="/sign_in" component={SignIn}/>
  <Route path="/teacher_dashboard" component={TeacherDashboard}/>
  <Route path="/course_dashboard" component={CourseDashboard}/>
  <Route path="/test_dashboard" component={TestDashboard}/>
  <Route path="/add_test" component={AddTest}/>
  <Route path="/add_course" component={AddCourse}/>
  <Route path="/add_panels" component={AddPanels}/>
  <Route path="/select_panels" component={SelectPanels}/>
  <Route path="/student_performance" component={StudentPerformance}/>
  <Route path="/challenges" component={Challenges}/>
  </Switch>

</div>

export default Home ;
