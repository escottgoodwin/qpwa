import React,{Component} from 'react';
import '../css/App.css';
import { Tab } from 'semantic-ui-react'
import ChallengeHeader from '../components/ChallengeHeader'

import ChallengeSection from '../components/ChallengeSection1'
import { Query } from "react-apollo";
import Error from './Error'
import ChallengeLoading from './ChallengeLoading'
import Loading from './Loading'


import {CHALLENGE_DASHBOARD_QUERY} from '../ApolloQueries'

class ChallengeDashboard extends Component {

  render() {

    const { test_id } = this.props.location.state

      return (

      <Query query={CHALLENGE_DASHBOARD_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error />

              const testToRender = data.test

              const challenges = testToRender.questions.map(question => question.challenges.map(challenge => challenge)).flat()

              const challengepanels = challenges.map(x => ({menuItem: x.challenge + ' - ' + x.addedBy.firstName + ' ' + x.addedBy.lastName, render: () => <ChallengeSection key={x.id}  challengeId={x.id} test_id={testToRender.id} challenges={x}/>  }))

          return (
            <div className="main">

                <div className="container">

                  <ChallengeHeader {...testToRender} />

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
