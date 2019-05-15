import React,{Component} from 'react'
import '../css/App.css'
import { Tab } from 'semantic-ui-react'
import ChallengeHeader from '../components/ChallengeHeader'

import ChallengeSection from '../components/ChallengeSection2'
import { Query } from "react-apollo"
import Error from './Error'
import ChallengeLoading from './ChallengeLoading'

import {TEST_CHALLENGE_QUERY, CHALLENGE_DASHBOARD2_QUERY} from '../ApolloQueries'

class ChallengeDashboard extends Component {

  render() {
    const { test_id } = this.props.location.state

      return (

      <Query query={CHALLENGE_DASHBOARD2_QUERY} variables={{ testId: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <ChallengeLoading />
              if (error) return <Error {...error}/>

              const challenges = data.challenges.challenges

              const challengepanels = challenges.map(x => ({menuItem: x.challenge + ' - ' + x.addedBy.firstName + ' ' + x.addedBy.lastName, render: () => <ChallengeSection key={x.id} test_id={test_id} challenge={x}/>  }))

          return (
            <div className="main">

                <div className="container">

                <Query query={TEST_CHALLENGE_QUERY} variables={{ testId: test_id }}>
                      {({ loading, error, data }) => {
                        if (loading) return <ChallengeLoading />
                        if (error) return <Error {...error}/>

                        const testToRender = data.test

                    return (

                      <ChallengeHeader {...testToRender} />

                    )
                  }
                }
                </Query>

                  <div className="coursecontainer">

                  <h3>Challenges</h3>
                  <hr/>
                  <Tab menu={{ color:'teal',fluid: true, vertical: true }} menuPosition='left' panes={challengepanels} />

                  </div>
                </div>


            </div>
          )
        }
      }
      </Query>
    )
  }
}

export default ChallengeDashboard
