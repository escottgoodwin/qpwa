import React,{Component} from 'react'
import { Table,Segment } from 'semantic-ui-react'

import ChallengeNavRow from '../components/ChallengeNavRow'

export default class ChallengeDList extends Component {

  componentDidMount() {
    //this.scrollToBottom()
    this.props.subscribeToNewChallenges();
  }

  render(){
    const {challenges} = this.props
    return (
      <>
      <Segment  fluid="true"  secondary attached='top'>
        {challenges.length} Challenges
      </Segment>

      <Segment style={{ maxHeight: 500, overflow: 'auto' }} attached>
      <Table celled selectable>

        <Table.Body>
          {
            challenges.map(challenge =>
            <ChallengeNavRow key={challenge.id}  changeChallenge={this.props.changeChallenge} {...challenge} test_id={this.props.test_id} />)
          }

       </Table.Body>

      </Table>
      </Segment>
      </>
    )
  }
}
