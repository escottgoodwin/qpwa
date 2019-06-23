import React, {Component} from 'react'
import '../css/App.css'
import { Link, withRouter } from 'react-router-dom'
import moment from 'moment'

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import deepPurple from '@material-ui/core/colors/deepPurple';
import orange from '@material-ui/core/colors/orange';

import { Mutation } from "react-apollo"
import { RELEASE_QUESTIONS_MUTATION, TEST_QUERY } from '../ApolloQueries'

class TeacherQuestionButtons extends Component{

render() {

  const now = new Date()
  const { id, published, publishDate, startTime, endTime, endDate, release, releaseDate, questions } = this.props

  return(

      <div style={{marginBottom:20}}>

      {
        published ?

        <>
        <Card style={{marginTop:20}}>
        <CardContent style={{ backgroundColor: orange[100]}}>
        <Typography style={{color: orange[800]}} variant="h5" component="h5">
          Test Published
        </Typography>
        </CardContent>
        <CardContent >
        <h5>Date: {moment(publishDate).format('MMMM Do, YYYY')}</h5>
        <div><h5>Time Frame: {startTime} - {endTime}</h5></div>
        <div><h5>End Date: {moment(endDate).format('MMMM Do YYYY, h:mm A')}</h5></div>
        </CardContent>
        </Card>
        </>

        :

        <Link  to={{
          pathname: "/publish_test",
          state:
            {
              test_id: id }
          }} >
        <Button  style={{marginTop:20}} fullWidth size='large' variant='contained' color="primary" >Publish Test</Button>

        </Link>
      }

      {release ?
        <>
        <Card style={{marginTop:20}}>
        <CardContent style={{ backgroundColor:deepPurple[100]}}>
        <Typography style={{color:deepPurple[800]}} variant="h5" component="h5">
          Questions Released
        </Typography>
        </CardContent>

        <CardContent >
          <h5>Date: {moment(releaseDate).format('MMMM Do, YYYY')}</h5>
          <h5>Total Questions: {questions.length}</h5>
        </CardContent>
        </Card>
        </>
        :

        <Mutation
            mutation={RELEASE_QUESTIONS_MUTATION}
            variables={{ test_id: id, releaseDate: now }}
            onCompleted={data => this._confirm(data)}
            refetchQueries={() => {
               return [{
                  query: TEST_QUERY,
                  variables: { test_id: id }
              }]}}
          >
            {mutation => (
              <Button  onClick={mutation} style={{marginTop:20}} fullWidth size='large' variant='contained' color="primary" >Release Question</Button>
          )}
          </Mutation>

      }

      </div>
    )
  }

  _confirm = async data => {

    const { id } = data.updateTest

    this.props.history.push({
      pathname: "/teacher_test_dashboard",
      state: { test_id: id }
      })
  }
}

export default withRouter(TeacherQuestionButtons)
