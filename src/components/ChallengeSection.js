import React,{Component} from 'react';
import '../css/App.css';
import { Tab, Image, Icon, Grid, Form, Divider, Input, Button } from 'semantic-ui-react'
import ChallengeMessageList from './ChallengeMessageList'
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";

import {ADD_CHALLENGE_MESSAGE_MUTATION, CHALLENGE_DASHBOARD_QUERY} from '../ApolloQueries'

class ChallengeSection extends Component {

  state = {
        challengeId: this.props.challengeId,
        challengeMessage:'',
        test_id: this.props.test_id,
      }
      handleSubmit = () => this.setState({ challengeMessage: ''})

  render() {
      const { testId } = this.props
      const { challengeId } = this.props.location.state
      const { challengeMessage, test_id } = this.state
      console.log(challengeId)
    return (
      <Query query={TEST_CHALLENGE_QUERY} variables={{ challengeId: challengeId }}>
            {({ loading, error, data }) => {
              if (loading) return <ChallengeLoading />
              if (error) return <Error {...error}/>

              const testToRender = data.test
              console.log(this.state.challengeId)
          return (
        <Tab.Pane key={this.props.id}>

        <Grid columns={2} >
        <Grid.Row>
        <Grid.Column >

        <div style={{textAlign: 'left',padding:'20px'}}>

        <div style={{width:"100%"}}>

        <div>
        <b>Challenge:</b> {this.props.challenges.challenge}
        </div>

        <div>
        <b>By:</b> {this.props.challenges.addedBy.firstName} {this.props.challenges.addedBy.lastName}
        </div>

        <div><b>Answer Given:</b>
        {
        this.props.challenges.question.questionAnswers.filter(a => a.addedBy.id === this.props.challenges.addedBy.id)[0].answer.choice
        } </div>

        <div style={{padding:'10px'}}>

        <div>
        <b>Question:</b> {this.props.challenges.question.question}
        </div>

        <div>
        <ul>
        {
          this.props.challenges.question.choices.map(choice => <li key={choice.choice}>{choice.choice} {choice.correct &&  <Icon  size='large' name='check square outline' color='teal' />} </li>)

        }
        </ul>
        </div>

        <div>
        <b>By:</b>{this.props.challenges.question.addedBy.firstName} {this.props.challenges.question.addedBy.lastName}
        </div>

        </div>

        <div>
        <Image  src={this.props.challenges.question.panel.link} />
        </div>

        </div>

        </div>


        </Grid.Column>

        <Grid.Column centered='true'>

        <ChallengeMessageList {...this.props.challenges}/>

        <Form onSubmit={this.handleSubmit}>
        <div style={{margin:'40px'}}>

        <Form.Group>

        <Mutation
            mutation={ADD_CHALLENGE_MESSAGE_MUTATION}
            variables={{ challengeId: this.props.challenges.id, challengeMessage:challengeMessage }}
            onCompleted={data => this._confirm(data)}
            refetchQueries={() => {
               return [{
                  query: CHALLENGE_DASHBOARD_QUERY,
                  variables: { testId: test_id }
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
              //<Button size="tiny" color='teal' onClick={mutation}>Submit</Button>
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
  _confirm = async data => {
    this.props.history.push({
      pathname: `/challenge_dashboard`,
      state: { test_id: this.props.test_id  }
      })
  }

}


export default withRouter(ChallengeSection)
