import React,{Component} from 'react'
import '../css/App.css'
import { Link, withRouter } from 'react-router-dom'

import { useMutation } from 'react-apollo-hooks';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import { RELEASE_QUESTIONS_MUTATION, TEST_QUERY } from '../ApolloQueries'



const _confirm = async data => {
  const { id } = data.updateTest
  this.props.history.push({
    pathname: `/test_dashboard`,
    state: { test_id: id }
    })
}

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

      {props.release ?
        <>
        <Card style={{marginTop:20}}>
        <CardContent >
        Release Date
        </CardContent>
        </Card>
        </>
        :

        releaseQuestion(props.id)
      }

      {
        props.published ?

        <>
        <Card style={{marginTop:20}}>
        <CardContent >
        <div>Publish Date</div>
        <div>Time parameters</div>
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

      </div>


export default withRouter(TeacherQuestionButtons)
