import React,{Component} from 'react';
import '../css/App.css';
import * as Cookies from "js-cookie"
import { Query } from "react-apollo";
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import TestHeaderStudent from '../components/TestHeaderStudent'
import TestStats from '../components/TestStats'
import TestQuestionStats from '../components/TestQuestionStats'

import Error from './Error'
import Loading from './Loading'
import {TEST_QUERY, CHALLENGE_STUDENT_COUNT_QUERY} from '../ApolloQueries';

class StudentTestDashboard extends Component {

  render() {

    const { test_id } = this.props.location.state
    const userId = Cookies.get('userid')

    return (

      <Query query={TEST_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error error={error} />

              const testToRender = data.test

          return (

            <div className="main">
            <div className="container">
              <TestHeaderStudent  {...testToRender} />

              <div className="coursecontainer">

              <Link  to={{
                pathname: "/student_test_panels",
                state:
                  {
                    test_id: test_id }
                }} >
                <Button color="blue" >{testToRender.panels.length} Panels</Button>
              </Link>

              <Query query={CHALLENGE_STUDENT_COUNT_QUERY} variables={{ testId: test_id, userId: userId }}>
                    {({ loading, error, data }) => {
                      if (loading) return <Loading />
                      if (error) return <Error error={error} />

                      const {count} = data.challenges

                  return (
                    <>
                    {count>0 &&

                      <Link  to={{
                        pathname: "/challenge_student_dashboard",
                        state:
                          {
                            test_id: test_id }
                        }} >
                        <Button color="blue" >{count}  Challenges</Button>
                      </Link>
                    }
                    </>
                )
              }}
            </Query>

              <div className="coursecontainer">

              <TestStats test_id={test_id} />

              <TestQuestionStats test_id={test_id} />

              </div>
            </div>

              </div>
</div>



          )
        }}
      </Query>
      )
    }
  }


export default StudentTestDashboard
