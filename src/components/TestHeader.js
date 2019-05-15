import React,{Component} from 'react';
import {withRouter} from "react-router-dom"
import moment from 'moment'
import '../css/App.css';

import { Query } from "react-apollo"
import Error from './Error'

import { Link } from 'react-router-dom'
import { Button, Loader } from 'semantic-ui-react'
import AddPanelButton from '../components/AddPanelButton'
import PanelCountButton from '../components/PanelCountButton'

import { Mutation} from "react-apollo";

import {RELEASE_QUESTIONS_MUTATION, TEST_QUERY } from '../ApolloQueries'

class TestHeader  extends Component {

  render() {

    const now = new Date()

    return (

      <Query query={TEST_QUERY} variables={{ test_id: this.props.testId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <Loader />
              if (error) return <Error {...error} />

              const testToRender = data.test

              const { id, testNumber, subject, testDate, release, published, course, panels, questions } = testToRender

          return (

  <div >

  <h2>
  <Link  to={{
    pathname: "/course_dashboard",
    state:
      { course_id: course.id }
    }} >
    {course.name} - {course.courseNumber}
    </Link>
    </h2>

<hr/>
  <div >

  <h3><Link  to={{
    pathname: "/test_dashboard",
    state:
      { test_id: id }
    }} >{testNumber} - {subject} - { moment(testDate).format("dddd MMMM Do YYYY") }
    </Link></h3>
  </div>

  <div style={{display:'inline-block',padding:15}}>

<Link to={{
  pathname: "/edit_test",
  state:
    {
      test_id: id,
    }
  }} >

<Button color="blue" >Edit</Button>
</Link>


<AddPanelButton testId={id} />

<PanelCountButton count={panels.length} testId={id}  />

<Link to={{
  pathname: "/student_performance",
  state:
    {
      test_id: id,
      course_id: course.id
    }
  }} >

<Button color="blue" >{questions.length} Questions</Button>
</Link>


{published ?
  <Link  to={{
    pathname: "/edit_publish_test",
    state:
      {
        test_id: id }
    }} >
  <Button color="blue" >Edit Published Test</Button>
  </Link>
:

  <Link  to={{
    pathname: "/publish_test",
    state:
      {
        test_id: id }
    }} >
      <Button color="blue" >Publish Test</Button>
  </Link>

}

{release ?
  <div></div>
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
      <Button color="blue" onClick={mutation} >Release Questions</Button>
    )}
  </Mutation>

}


</div>

</div>

)
}}
</Query>

)
}

_confirm = async data => {
  const { id } = data.updateTest
  this.props.history.push({
    pathname: `/test_dashboard`,
    state: { test_id: id }
    })
}

}

export default withRouter(TestHeader)
