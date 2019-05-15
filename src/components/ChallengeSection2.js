import React,{Component} from 'react';
import '../css/App.css';
import { Tab, Image, Icon, Grid, Form, Divider, Input, Button } from 'semantic-ui-react'
import ChallengeMessageList from './ChallengeMessageList'
import ChatLoading from './ChatLoading'
import { withRouter } from "react-router-dom";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";

import {CHALLENGE_MESSAGE_SUBSCRIPTION, CHALLENGE_MESSAGE_QUERY, ADD_CHALLENGE_MESSAGE_MUTATION} from '../ApolloQueries'

class ChallengeSection extends Component {

  state = {
        challengeMessage:'',
      }

  render() {
      const { challengeMessage } = this.state
      const challengeId = this.props.challenge.id

    return (
        <Tab.Pane key={this.props.challenge.id}>

        <Grid columns={2} >
        <Grid.Row>
        <Grid.Column >

        <div style={{textAlign: 'left',padding:'20px'}}>

        <div style={{width:"100%"}}>

        <div>
        <b>Challenge:</b> {this.props.challenge.challenge}
        </div>

        <div>
        <b>By:</b> {this.props.challenge.addedBy.firstName} {this.props.challenge.addedBy.lastName}
        </div>

        <div><b>Answer Given:</b>
        {
        this.props.challenge.answer.answer.choice
        } </div>

        <div style={{padding:'10px'}}>

        <div>
        <b>Question:</b> {this.props.challenge.answer.question.question}
        </div>

        <div>
        <ul>
        {
          this.props.challenge.answer.question.choices.map(choice => <li key={choice.choice}>{choice.choice} {choice.correct &&  <Icon  size='large' name='check square outline' color='teal' />} </li>)
        }
        </ul>
        </div>

        <div>
        <b>By:</b>{this.props.challenge.answer.question.addedBy.firstName} {this.props.challenge.answer.question.addedBy.lastName}
        </div>

        </div>

        <div>
        {this.props.challenge.answer.question.panel.link &&
          <Image  src={this.props.challenge.answer.question.panel.link} />
        }
        </div>

        </div>

        </div>

        </Grid.Column>

        <Grid.Column centered='true'>

        <Query query={CHALLENGE_MESSAGE_QUERY}
              variables={{ challengeId: challengeId }} >
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <ChatLoading />
            if (error) return <div>Error... </div>

            const challengeMessages = data.challengeMessages

            return (

              <ChallengeMessageList {...challengeMessages}
              subscribeToNewChallengeMessage={() =>
                subscribeToMore({
                  document: CHALLENGE_MESSAGE_SUBSCRIPTION,
                  variables: {challengeId: challengeId },
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev
                    const newChallengeMsg = subscriptionData.data.challengeMsg.node
                    return  Object.assign({}, prev, {
                      challengeMessages: {
                        challengeMessages: [...prev.challengeMessages.challengeMessages, newChallengeMsg],
                        __typename: prev.challengeMessages.__typename
                    }
                    })
                  }
                })
              }
              />
          )
       }}
     </Query>

        <Form onSubmit={() => this.setState({ challengeMessage: ''})}>
        <div style={{margin:'40px'}}>

        <Form.Group>

        <Mutation
            mutation={ADD_CHALLENGE_MESSAGE_MUTATION}
            variables={{ challengeId: this.props.challenge.id, challengeMessage:challengeMessage }}
            refetchQueries={() => {
               return [{
                  query: gql`
                  query TestChallenges($testId:ID!){
                    test(id:$testId){
                        id
                        subject
                        testNumber
                        testDate
                        course{
                          id
                          name
                          courseNumber
                        }
                        questions{
                          challenges{
                            challenge
                            addedBy{
                              id
                              firstName
                              lastName
                            }
                            challengeMessages{
                              id
                              challengeMessage
                              addedDate
                              addedBy{
                                firstName
                                lastName
                              }
                            }
                            id
                            question{
                              question
                              choices{
                                correct
                                choice
                              }
                  						questionAnswers{
                                addedBy{
                                  id
                                  firstName
                                }
                                answer{
                                  choice
                                }
                              }
                              panel{
                                link
                              }
                              addedBy{
                                firstName
                                lastName
                              }
                            }

                          }
                        }

                      }
                  }
                `,
                  variables: { testId: this.props.test_id, }
              }];
              }} >
            {mutation => (

              <Input
              action={ <Button size="tiny" color='teal' onClick={mutation}>Submit</Button>}
                size="tiny"
                    placeholder='comment...'
                    name='challengeMessage'
                    value={this.state.challengeMessage}
                    onChange={e => this.setState({ challengeMessage: e.target.value })}
                  />
                    )}
          </Mutation>
          </Form.Group>

          </div>

        </Form>

        </Grid.Column>
        </Grid.Row>

        </Grid>
        <Divider vertical />
        </Tab.Pane>

    )
  }
}


export default withRouter(ChallengeSection)
