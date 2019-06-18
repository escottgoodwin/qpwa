import React from 'react'
import '../css/App.css'
import { Link, withRouter } from 'react-router-dom'
import moment from 'moment'
import { useMutation } from 'react-apollo-hooks';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import deepPurple from '@material-ui/core/colors/deepPurple';
import orange from '@material-ui/core/colors/orange';

import { RELEASE_QUESTIONS_MUTATION, TEST_QUERY } from '../ApolloQueries'

function releaseQuestion(id){
  const now = new Date()
  const releaseMutation = (id) = useMutation(RELEASE_QUESTIONS_MUTATION,
    { variables: { test_id: id, releaseDate: now } },
    { onCompleted: (data) => this._confirm(data) },
    { refetchQueries: () => {
         return [{
            query: TEST_QUERY,
            variables: { test_id: id }
        }]}
      }
    );

    return (<Button onClick={releaseMutation} style={{marginTop:20}} fullWidth size='large' variant='contained' color="primary" >Release Questions</Button>)
}


const TeacherQuestionButtons = props =>

      <div style={{marginBottom:20}}>

      {
        props.published ?

        <>
        <Card style={{marginTop:20}}>
        <CardContent style={{ backgroundColor:orange[100]}}>
        <Typography style={{color:orange[800]}} variant="h5" component="h5">
          Test Published
        </Typography>
        </CardContent>
        <CardContent >
        <h5>Date: {moment(props.publishDate).format('MMMM Do, YYYY')}</h5>
        <div><h5>Time Frame: {props.startTime} - {props.endTime}</h5></div>
        <div><h5>End Date: {moment(props.endDate).format('MMMM Do YYYY, h:mm A')}</h5></div>
        </CardContent>
        </Card>
        </>

        :

        <Link  to={{
          pathname: "/publish_test",
          state:
            {
              test_id: props.id }
          }} >
        <Button  style={{marginTop:20}} fullWidth size='large' variant='contained' color="primary" >Publish Test</Button>

        </Link>
      }

      {props.release ?
        <>
        <Card style={{marginTop:20}}>
        <CardContent style={{ backgroundColor:deepPurple[100]}}>
        <Typography style={{color:deepPurple[800]}} variant="h5" component="h5">
          Questions Released
        </Typography>
        </CardContent>

        <CardContent >
          <h5>Date: {moment(props.releaseDate).format('MMMM Do, YYYY')}</h5>
          <h5>Total Questions: {props.questions.length}</h5>
        </CardContent>
        </Card>
        </>
        :

        releaseQuestion(props.id)
      }

      </div>


export default withRouter(TeacherQuestionButtons)
