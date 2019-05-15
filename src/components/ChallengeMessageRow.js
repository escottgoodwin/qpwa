import React from 'react';
import '../css/App.css';
import { Comment } from 'semantic-ui-react'
const moment = require('moment')

const ChallengeMessageRow = (props) =>

    <Comment >
    <Comment.Content>
      <Comment.Author as='a'>{props.addedBy.firstName} {props.addedBy.lastName}</Comment.Author>
      <Comment.Metadata>
        <div>{moment(props.addedDate).calendar()}</div>
      </Comment.Metadata>
      <Comment.Text ><div >{props.challengeMessage}</div></Comment.Text>
    </Comment.Content>
    </Comment>

export default ChallengeMessageRow
