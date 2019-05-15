import React,{Component} from 'react'
import '../css/App.css'
import * as Cookies from "js-cookie"
import { Grid, Segment, Loader } from 'semantic-ui-react'
import TestHeaderStudent from '../components/TestHeaderStudent'

import ChallengeSection from '../components/ChallengeSection3'
import ChallengeDList from '../components/ChallengeDList'


import { Query } from "react-apollo"
import Error from './Error'
import Loading from './Loading'

import {TEST_CHALLENGE_QUERY,CHALLENGE_DASHBOARD_STUDENT_QUERY,NEW_CHALLENGE_SUBSCRIPTION} from '../ApolloQueries'

class ChallengeDashboardStudent extends Component {

  state = {
    challengeId: '',
    test_id:this.props.location.state.test_id
  }

  changeChallenge = (challengeId) =>
    this.setState({challengeId:challengeId})


  render() {

    const {challengeId, test_id} = this.state
    const userId = Cookies.get('userid')

      return (


            <div className="main">

                <div className="container">

                <Query query={TEST_CHALLENGE_QUERY} variables={{ testId: test_id }}>
                      {({ loading, error, data }) => {
                        if (loading) return <Loading />
                        if (error) return <Error {...error}/>

                        const testToRender = data.test

                    return (

                      <TestHeaderStudent {...testToRender} />
                    )
                  }
                }
                </Query>

                <Query query={CHALLENGE_DASHBOARD_STUDENT_QUERY} variables={{ testId: test_id, userId: userId }}>
                      {({ loading, error, data, subscribeToMore }) => {
                        if (loading) return <Loader />
                        if (error) return <Error {...error} />

                        const challenges = data.challenges.challenges

                        const initialChallengeId = challenges[0].id

                    return (

                  <div className="coursecontainer">

                  <Grid columns={2} >
                  <Grid.Row >
                  <Grid.Column width={6}>

                  <ChallengeDList
                      challenges={challenges}
                      changeChallenge={this.changeChallenge}
                      test_id={test_id}
                      subscribeToNewChallenges={() =>
                        subscribeToMore({
                          document: NEW_CHALLENGE_SUBSCRIPTION,
                          variables: {testId: test_id },
                          updateQuery: (prev, { subscriptionData }) => {
                            if (!subscriptionData.data) return prev
                            let newChallenge = subscriptionData.data.newChallenge.node
                            return  Object.assign({}, prev, {
                              challenges: {
                                challenges: [...prev.challenges.challenges, newChallenge],
                                __typename: prev.challenges.__typename
                            }
                            })
                        }
                      })
                    }
                  />

                  </Grid.Column >

                  <Grid.Column centered='true' width={10}>

                  <Segment style={{ minHeight: 500, overflow: 'auto' }} attached>

                  <ChallengeSection changeChallenge={this.changeChallenge} initialChallengeId={initialChallengeId} challengeId={challengeId} />

                  </Segment>
                  </Grid.Column>
                  </Grid.Row>
                  </Grid>
                  </div>


                )
              }
              }
          </Query>
          </div>
          </div>

    )
  }
}

export default ChallengeDashboardStudent
