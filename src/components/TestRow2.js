import React,{Component} from 'react';
import '../css/App.css';
import { Button, Card, Loader } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import PanelCountRow from './PanelCountRow'
import QuestionCountRow from './QuestionCountRow'
import AnswerCountRow from './AnswerCountRow'
import ChallengeCountRow from './ChallengeCountRow'
import Error from './Error'
import CoursePlaceholder from '../screens/CoursePlaceholder'


import { Query } from "react-apollo";

import { TEST_LIST_QUERY2, PANEL_COUNT_SUBSCRIPTION, PANEL_COUNT_QUERY, QUESTION_COUNT_SUBSCRIPTION, QUESTION_COUNT_QUERY, CHALLENGE_COUNT_QUERY, CHALLENGE_COUNT_SUBSCRIPTION, TEST_STATS_PERFORMANCE_QUERY, ANSWER_STATS_SUBSCRIPTION} from '../ApolloQueries'

var dateFormat = require('dateformat')

export default class TestRow extends Component {

  render() {
    const { id } = this.props.test
    return (

      <Query query={TEST_LIST_QUERY2} variables={{ testId: id }} fetchPolicy="cache-and-network">
            {({ loading, error, data, subscribeToMore }) => {
              if (loading) return <CoursePlaceholder />
              if (error) return <Error {...error}/>

              const { id, testNumber, subject, testDate, testType, published, release, questionsCount, panelsCount, answersCount, accuracy, challengeCount }  = data.testList


          return (

      <Card fluid>
        <Card.Content>
        <div className="course_row">
        <div>

          <Link  to={{
            pathname: "/test_dashboard",
            state:
              { test_id: id }
            }} >

        <h5>{testNumber} - {subject} - { dateFormat(testDate, "dddd, mmmm dS, yyyy") }</h5>

        </Link>
        </div>
        <div>
        {testType === 'CLASS'
          <Button basic disabled color="purple" size="small">Lecture</Button>
        }

        {testType === 'LAB'
          <Button basic disabled color="orange" size="small">Lab</Button>
        }

        {published &&
          <Button basic disabled color="green" size="small">Test Published</Button>
        }
        {published &&
          <Button basic disabled color="green" size="small">Test Published</Button>
        }

        {(release && published) &&
          <Button basic disabled color="teal" size="small">Questions Released</Button>
        }
      </div>

        </div>

        <hr />

          <div className="course_row">

                <QuestionCountRow count={questionsCount} testId={id} courseId={this.props.courseId}

                />


                <AnswerCountRow answersCount={answersCount} accuracy={accuracy}

                />

                <ChallengeCountRow count={challengeCount} testId={id}

                />


                <PanelCountRow count={panelsCount} testId={id} subscribeToMore={subscribeToMore}
                    subscribeToNewPanelCount={() =>
                      subscribeToMore({
                        document: PANEL_COUNT_SUBSCRIPTION,
                        variables: {testId: id },
                        updateQuery: (prev, { subscriptionData }) => {
                          if (!subscriptionData.data) return prev
                          return {
                            testList:{
                              panelsCount: subscriptionData.data.panelCount.count,
                              __typename: prev.testList.__typename
                            }
                          }
                        }
                      }
                    )
                  }
                  />

          </div>
          </Card.Content>
        </Card>
      )
    }}
  </Query>
    )
  }
}
