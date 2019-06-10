import React,{Component} from 'react'
import { useQuery } from 'react-apollo-hooks';
import * as Cookies from "js-cookie"
import '../css/App.css'
import { Query } from "react-apollo"

import TeacherHeader from '../components/TeacherHeader'
import CourseList from '../components/CourseList'

import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

import {TEACHER_DASHBOARD_QUERY} from '../ApolloQueries'

const TeacherDashboard1 = (props) => {

  const userid = Cookies.get('userid')
  const { data, error, loading } = useQuery(TEACHER_DASHBOARD_QUERY, { variables: { userid }, fetchPolicy:"cache-and-network"})

  if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
  if (error) return <div> {JSON.stringify(error)} </div>

  const userToRender = data.user
  const teacherCourses = new Array(userToRender.teacherCourses.filter(course => !course.deleted))

  return (

    <Fade in={!loading}>

    <>

    <TeacherHeader courses={teacherCourses[0].length} {...userToRender} />

    <CourseList  {...teacherCourses} />

    </>

    </Fade>
    
  );
};

export default TeacherDashboard1
