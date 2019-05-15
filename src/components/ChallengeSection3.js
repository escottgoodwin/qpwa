import React,{Component} from 'react';
import '../css/App.css';
import { Image, Icon, Grid, Form, Input, Button, Segment, Loader } from 'semantic-ui-react'
import ChallengeMessageList from './ChallengeMessageList'
import Error from './Error'

import { withRouter } from "react-router-dom";
import { Mutation, Query } from "react-apollo";

import {CHALLENGE_SECTION_QUERY, CHALLENGE_MESSAGE_SUBSCRIPTION, CHALLENGE_MESSAGE_QUERY, ADD_CHALLENGE_MESSAGE_MUTATION,CHALLENGE_DASHBOARD_QUERY } from '../ApolloQueries'

class ChallengeSection extends Component {

  state = { challengeMessage:'' }

  componentDidMount(){
    this.props.changeChallenge(this.props.initialChallengeId)
  }

  render() {

      const { challengeMessage } = this.state
      const { challengeId } = this.props

    return (

      <Query query={CHALLENGE_SECTION_QUERY} variables={{ challengeId: challengeId }}>
            {({ loading, error, data }) => {
              if (loading) return <Loader />
              if (error) return <Error {...error}/>

              const challengeToRender= data.challenge

          return (

        <Grid columns={2} >
        <Grid.Row>
        <Grid.Column >

        <div style={{textAlign: 'left',padding:'20px'}}>

        <div style={{width:"100%"}}>

        <div>
        <b>Challenge:</b> {challengeToRender.challenge}
        </div>

        <div>
        <b>By:</b> {challengeToRender.addedBy.firstName} {challengeToRender.addedBy.lastName}
        </div>

        <div><b>Answer Given:</b>
        {
        challengeToRender.answer.answer.choice
        } </div>

        <div style={{padding:'10px'}}>

        <div>
        <b>Question:</b> {challengeToRender.answer.answer.question.question}
        </div>

        <div>
        <ul>
        {
          challengeToRender.answer.answer.question.choices.map(choice => <li key={choice.choice}>{choice.choice} {choice.correct &&  <Icon  size='large' name='check square outline' color='teal' />} </li>)
        }
        </ul>
        </div>

        <div>
        <b>By:</b>{challengeToRender.answer.answer.question.addedBy.firstName} {challengeToRender.answer.answer.question.addedBy.lastName}
        </div>

        </div>

        <div>
        {challengeToRender.answer.answer.question.panel.link &&
          <Image  src={challengeToRender.answer.answer.question.panel.link} />
        }
        </div>

        </div>

        </div>

        </Grid.Column>

        <Grid.Column centered='true'>
        <Segment style={{ minHeight: 450, overflow: 'auto' }} attached>
        <Query query={CHALLENGE_MESSAGE_QUERY}
              variables={{ challengeId: challengeId }} >
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <Loader />
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
     </Segment>
        <Form onSubmit={() => this.setState({ challengeMessage: ''})}>
        <div style={{marginTop:'20px'}}>

        <Form.Group>

        <Mutation
            mutation={ADD_CHALLENGE_MESSAGE_MUTATION}
            variables={{ challengeId: challengeToRender.id, challengeMessage:challengeMessage }}
            refetchQueries={() => {
               return [{
                  query: CHALLENGE_DASHBOARD_QUERY,
                  variables: { testId: challengeToRender.answer.answer.question.test.id, }
              }]
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
      )
    }
  }
  </Query>
    )
  }
}


export default withRouter(ChallengeSection)
