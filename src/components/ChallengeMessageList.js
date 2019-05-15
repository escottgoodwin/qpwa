import React,{Component} from 'react';
import '../css/App.css';
import { Comment } from 'semantic-ui-react'

import ChallengeMessageRow from './ChallengeMessageRow'


class ChallengeMessageList extends Component {

  messagesEnd = React.createRef()

  componentDidMount() {
    //this.scrollToBottom()
    this.props.subscribeToNewChallengeMessage();
  }

  componentDidUpdate () {
    //this.scrollToBottom()
  }

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
  }

render() {


return (
  <Comment.Group size='small' style={{ overflow: 'auto', height: 375, textAlign:"left", paddingLeft:'20px'}}>
    {this.props.challengeMessages.map(challengeMessage =>
      <ChallengeMessageRow key={challengeMessage.id} {...challengeMessage} />)}
  </Comment.Group>

)
}
}




export default ChallengeMessageList
