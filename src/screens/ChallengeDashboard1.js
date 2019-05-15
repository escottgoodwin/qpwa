import React,{Component} from 'react';
import '../css/App.css';
import { Tab } from 'semantic-ui-react'
import ChallengeHeader from '../components/ChallengeHeader'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import moment from 'moment'

import ChallengeSection from '../components/ChallengeSection1'
import { Query } from "react-apollo";
import Error from './Error'
import ChallengeLoading from './ChallengeLoading'
import gql from "graphql-tag";

const CHALLENGE_QUERY = gql`
query TestChallenges($test_id:ID!){
  challenges(where:{answer:{question:{test:{id:$test_id}}}}){
    challenges{
      id
      challenge
      addedDate
      addedBy{
        firstName
        lastName
      }
      answer{
        question{
          question
        	addedBy{
            firstName
            lastName
          }
        }
      }
    }
  }
}
`
class ChallengeDashboard extends Component {

  render() {
    const { test_id } = this.props.location.state

      return (

      <Query query={CHALLENGE_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <ChallengeLoading />
              if (error) return <Error />

              const challenges = data.challenges.challenges

              const challengeRoutes = challenges.map(challenge => (
                {
                  path: challenge.id,
                  main: () => <h2>challenge.challenge</h2>
                })
              )



          return (
            <div className="main">

                <div className="container">



                  <div className="coursecontainer">
                  <h3>Challenges</h3>

                  <Router>
    <div style={{ display: "flex" }}>

    <hr/>
      <div
        style={{
          padding: "10px",
          width: "30%",
          background: "white",
          textAlign:'left'
        }}
      >
        <ul style={{ listStyleType: "none", padding: 0 }}>
        {
          challenges.map(challenge =>
            <li>
              <Link to={challenge.id} >{challenge.challenge}</Link>
              <div style={{ fontSize:10,color:'darkgray' }} >
                {challenge.addedBy.firstName} {challenge.addedBy.lastName} - {moment(challenge.addedDate).format("dddd, MMMM Do YYYY, h:mm a")}
              </div>
              <div >
                {challenge.answer.question.question}
              </div>
              <div style={{ fontSize:10,color:'darkgray' }} >
                {challenge.answer.question.addedBy.firstName} {challenge.answer.question.addedBy.lastName} - {moment(challenge.answer.question.addedDate).format("dddd, MMMM Do YYYY, h:mm a")}
              </div>
              <hr/>
            </li>
          )
        }
        </ul>

      </div>

      <div style={{ flex: 1, padding: "10px" }}>
      {challengeRoutes.map((route, index) => (
      // Render more <Route>s with the same paths as
      // above, but different components this time.
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.main}
      />
    ))}
      </div>
    </div>
  </Router>



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
