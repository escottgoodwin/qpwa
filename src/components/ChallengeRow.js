import React from 'react';
import '../css/App.css';
import moment from 'moment'
import { Table } from 'semantic-ui-react'


const ChallengeRow = (props) =>

<Table.Row>
<Table.Cell>
  <div>
  <div>
    <b>Challenge: </b>
    {props.challenge}
  </div>
  <div style={{fontSize: '12px'}}>
    By {props.addedBy.firstName} {props.addedBy.lastName}
  </div>

  <hr />

  <div >
  <b>Question: </b>
    {props.answer.question.question}
  </div>
  <div style={{fontSize: '12px'}}>
    By {props.answer.question.addedBy.firstName} {props.answer.question.addedBy.lastName}
  </div>

  <hr />

  <div style={{fontSize: '12px',color:'#C0C0C0'}}>
    {moment(props.addedDate).format("dddd, MMMM Do YYYY, h:mm a")}
  </div>
  </div>
  </Table.Cell>
  </Table.Row>







export default ChallengeRow
