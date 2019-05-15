import React,{Component} from 'react';
import '../css/App.css';
import moment from 'moment'
import { Query,Mutation } from "react-apollo";
import { Button, Grid, Segment, Message, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import TestHeader from '../components/TestHeader'
import TestChallenges from '../components/TestChallenges'
import TestPerformance from '../components/TestPerformance'

import Error from './Error'
import Loading from './Loading'

import {TEST_QUERY,NEW_CHALLENGE_SUBSCRIPTION,DELETE_TEST_MUTATION,CHALLENGE_TEST_QUERY,TEST_STATS_QUERY, TEACHER_DASHBOARD_QUERY} from '../ApolloQueries';

const uuidv4 = require('uuid/v4');

class TestDashboard extends Component {

  state = {
    graphQLError: '',
    isVisibleGraph:false,
    networkError:false,
    isVisibleNet:false,
  }

  render() {

    const { test_id } = this.props.location.state
    const userid = sessionStorage.getItem('userid')
    const { graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state


    return (



            <div className="main">
            <div className="container">
              <TestHeader testId={test_id} />
              <Query query={TEST_QUERY} variables={{ test_id: test_id }} fetchPolicy="cache-and-network">
                    {({ loading, error, data }) => {
                      if (loading) return <Loading />
                      if (error) return <Error {...error} />

                      const testToRender = data.test

                      const { published, publishDate, release, testType, releaseDate, endDate, startTime, endTime } = testToRender

                  return (

              <Grid stackable className="fill-content">

              <Grid.Row stretched>
              <Grid.Column  width={16}>

              <div>

                <Segment>
                <Grid>
                <Grid.Row >
                <Grid.Column  width={4}>

                {testType==='LAB' ?
                <Button basic disabled color="orange" size="small">Lab Test</Button>
                :
                <Button basic disabled color="purple" size="small">Lecture Test</Button>
                }
                </Grid.Column  >


                <Grid.Column  width={8}>
                {published &&
                <Button disabled size="small" color='green' basic>
                  <b>Published: </b> {moment(publishDate).format("MMMM Do YYYY")} <b>End: </b> {moment(endDate).format("MMMM Do YYYY")} <b>Hours: </b> {startTime} - {endTime}
                  </Button>
                }

                </Grid.Column  >


                <Grid.Column  width={4}>

              {release &&
                <Button disabled size="small" color='teal' basic>
              <b>Questions Released: </b> {moment(releaseDate).format("MMMM Do YYYY")}
              </Button>
              }
              </Grid.Column  >

              </Grid.Row >
              
              </Grid>

              </Segment>
              </div>

              </Grid.Column  >
              </Grid.Row >

                <Grid.Row stretched>
                <Grid.Column  width={8}>

                <Query query={CHALLENGE_TEST_QUERY} variables={{ testId: test_id, courseId: testToRender.course.id }}>
                      {({ loading, error, data, subscribeToMore }) => {
                        if (loading) return <Loading />
                        if (error) return <Error error={error} />

                        const challenges = data.challenges.challenges

                    return (
                      <>
                      <Segment  fluid="true"  secondary attached='top'>
                      {challenges.length>0 ?

                          <Link  to={{
                            pathname: "/challenge_dashboard",
                            state:
                            { course_id: testToRender.course.id,
                              test_id: test_id }
                            }} >
                            {challenges.length} Challenges
                          </Link>
                          :
                          <div>0 Challenges</div>
                        }
                      </Segment>

                    <TestChallenges testToRender={testToRender} challenges={challenges}
                    subscribeToNewChallenges={() =>
                      subscribeToMore({
                        document: NEW_CHALLENGE_SUBSCRIPTION,
                        variables: {testId: test_id },
                        updateQuery: (prev, { subscriptionData }) => {
                          if (!subscriptionData.data) return prev
                          let newChallenge = subscriptionData.data.newChallenge
                          return {
                            challenges:{
                              challenges: [...prev.challenges.challenges, newChallenge],
                              __typename: prev.challenges.__typename
                          }
                        }
                      }
                    })
                    }
                  />
                  </>
                  )
                }}
              </Query>

                </Grid.Column>

                <Grid.Column width={8}>
                <div>

                <Query query={TEST_STATS_QUERY} variables={{ testId: test_id, courseId: testToRender.course.id}}>
                      {({ loading, error, data }) => {
                        if (loading) return <Loader />
                        if (error) return <Error error={error} />

                        const stats = []
                        data.userTestStats.forEach(function(element) {
                        const id = uuidv4()
                          const item =  {
                            id: id,
                            name: element.name,
                            total: element.total,
                            totalCorrect: element.totalCorrect,
                            percentCorrect: element.percentCorrect
                          }
                          stats.push(item)
                        });

                    return (
<>
                      <Segment secondary attached='top'>
                      <Link  to={{
                      pathname: "/student_performance",
                      state:
                      { course_id: testToRender.course.id,
                        test_id: testToRender.id }
                      }} >
                      Questions
                      </Link>

                      </Segment>

                    <TestPerformance testId={testToRender.id} stats={stats}  />
                    </>
                    )
                  }}
                </Query>

                </div>


                </Grid.Column>
              </Grid.Row>
              </Grid>
            )
          }}
          </Query>

              <div style={{padding:"15px"}} >

              <Mutation
                  mutation={DELETE_TEST_MUTATION}
                  variables={{ test_id: test_id }}
                  onCompleted={data => this._confirm(data)}
                  onError={error => this._error (error)}
                  refetchQueries={() => {
                     return [{
                        query: TEACHER_DASHBOARD_QUERY,
                        variables: { userid }
                    }]
                }}
                >
                  {mutation => (
                    <Button  color='red' onClick={mutation}>Delete Test</Button>
                  )}
                </Mutation>

                {isVisibleGraph &&
                  <Message negative>
                    <p><b>{graphQLError}</b></p>
                  </Message>
                }

                {isVisibleNet &&
                  <Message negative>
                    <p><b>{networkError}</b></p>
                  </Message>
                }

                </div>
              </div>
</div>




      )
    }

    _error = async error => {

        const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
        this.setState({ isVisibleGraph: true, graphQLError: gerrorMessage})

        error.networkError &&
          this.setState({ isVisibleNet: true, networkError: error.networkError.message})

    }

    _confirm = async data => {
      this.props.history.push({pathname: "/course_dashboard",
      state:
        { course_id: data.updateTest.course.id }})
    }
  }


export default TestDashboard
