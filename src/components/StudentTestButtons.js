import React,{Component} from 'react'
import '../css/App.css'
import { Query } from "react-apollo"
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Error from './Error'

import {CHALLENGE_STUDENT_COUNT_QUERY} from '../ApolloQueries'

class StudentTestButtons extends Component {

  render(){

    const { classes, panels, id, userId } = this.props
    return (

      <>
      <Link  to={{
        pathname: "/student_test_panels",
        state:
          {
            test_id: id }
        }} >
        <Button  style={{marginTop:20}} fullWidth size='large' variant='contained' color="primary" >{panels.length} Panels</Button>
      </Link>

      <Link  to={{
        pathname: "/challenge_student_dashboard",
        state:
          {
            test_id: id }
        }} >
        <Button style={{marginTop:20}}fullWidth size='large' variant='contained' color="primary" >Challenges</Button>
      </Link>

      <Link  to={{
        pathname: "/test_questions",
        state:
          {
            testId: id }
        }} >
        <Button style={{marginTop:20}} fullWidth size='large' variant='contained' color="primary" >All Questions</Button>
      </Link>

      </>
      )
  }

}

export default StudentTestButtons
