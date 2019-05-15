import React from 'react';
import '../css/App.css';

import { Table   } from 'semantic-ui-react'

const ChallengePRow = (props) =>

<Table.Row>
  <Table.Cell>
      {props.addedBy.firstName } {props.addedBy.lastName }
  </Table.Cell>
  <Table.Cell>
      <div>{props.challenge}</div>
      <div><b>Q:</b> {props.question.question}</div>
  </Table.Cell>
</Table.Row>

export default ChallengePRow
