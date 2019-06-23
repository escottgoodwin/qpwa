import React,{Component} from 'react';
import {withRouter} from "react-router-dom"
import moment from 'moment'
import '../css/App.css';

import { Microscope } from 'mdi-material-ui'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import BookIcon from '@material-ui/icons/Book';

import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';

import { Query } from "react-apollo";
import { TEST_QUERY } from '../ApolloQueries';

class TeacherTestHeader  extends Component {

  render() {

    const { test_id, classes, history } = this.props

    return (

      <Query query={TEST_QUERY} variables={{ test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'20vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div> {JSON.stringify(error)} </div>

              const { course, id, testType, testNumber, subject, testDate } = data.test

          return (

            <>
            <div style={{paddingTop:20,paddingBottom:20}}>

              <Card style={{backgroundColor:'#334667',color:'#e4f1fe',marginBottom:5}}
                onClick={()=> history.push({
                pathname: "/course_dashboard",
                state:
                  { course_id: course.id }
                })}
                className={classes.card}>

              <CardActionArea>

              <CardContent>
              <div style={{padding:'15px'}}>
              <h4>{course.name} - {course.courseNumber}</h4>
              </div>
              </CardContent>
              </CardActionArea>
              </Card>

              </div>

              <div style={{paddingTop:20,paddingBottom:20}}>

              <Card onClick={()=> history.push({
                pathname: "/teacher_test_dashboard",
                state:
                  { test_id: id }
                })}
                className={classes.card}>
              <CardActionArea>
              {testType==="CLASS" &&
              <CardContent style={{ backgroundColor:cyan[100]}}>
              <BookIcon style={{ color:cyan[700]}} /> <h5 style={{color:cyan[700]}}>
              Lecture
              </h5>
              </CardContent>
              }

              {testType==="LAB" &&
              <CardContent style={{ backgroundColor:teal[100]}}>
              <Microscope style={{color:teal[700]}}/><h5 style={{color:teal[700]}}>
              Lab
              </h5>
              </CardContent>
              }

            <CardContent >

            <h5>
            {testNumber}
            </h5>

            <h2>
              {subject}
            </h2>
              <h5 color={{color:'grey'}}>
                { moment(testDate).format('MMMM Do YYYY, h:mm a') }
              </h5>
            </CardContent>
            </CardActionArea>
            </Card >
            </div>
            </>

          )
        }}
      </Query>

    )
  }
}

export default withRouter(TeacherTestHeader)
