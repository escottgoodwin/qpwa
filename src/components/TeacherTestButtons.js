import React,{Component} from 'react'
import '../css/App.css'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';

class TeacherTestButtons extends Component {

  render(){

    const { panels, id } = this.props
    return (

      <>
      <Link  to={{
        pathname: "/teacher_test_panels",
        state:
          {
            test_id: id }
        }} >
        <Button  style={{marginTop:20}} fullWidth size='large' variant='contained' color="primary" >{panels.length} Panels</Button>
      </Link>

      <Link  to={{
        pathname: "/teacher_challenges",
        state:
          {
            testId: id }
        }} >
        <Button style={{marginTop:20}} fullWidth size='large' variant='contained' color="primary" >Challenges</Button>
      </Link>

      <Link  to={{
        pathname: "/teacher_questions",
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

export default TeacherTestButtons
