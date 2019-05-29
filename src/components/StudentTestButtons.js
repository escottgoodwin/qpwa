import React,{Component} from 'react'
import '../css/App.css'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';

class StudentTestButtons extends Component {

  render(){

    const { panels, id, testType } = this.props
    return (

      <>
      { testType === 'LAB' &&
        <Link  to={{
          pathname: "/student_add_photos",
          state:
            {
              testId: id }
          }} >
          <Button  style={{marginTop:20}} fullWidth size='large' variant='contained' color="primary" >Add Photos</Button>
        </Link>
      }
      <Link  to={{
        pathname: "/student_test_panels",
        state:
          {
            test_id: id }
        }} >
        <Button  style={{marginTop:20}} fullWidth size='large' variant='contained' color="primary" >{panels.length} Panels</Button>
      </Link>

      <Link  to={{
        pathname: "/student_challenges",
        state:
          {
            testId: id }
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
