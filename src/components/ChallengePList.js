import React from 'react';
import '../css/App.css';
import { Table, Tab } from 'semantic-ui-react'
import ChallengePRow from './ChallengePRow'

const ChallengePList = (props) =>

<Table  celled  selectable>
  <Table.Body>
  {
    Object.values(props).map(challenge =>
    <ChallengePRow key={challenge.id} {...challenge} />)
  }
  </Table.Body>
</Table>

export default ChallengePList
