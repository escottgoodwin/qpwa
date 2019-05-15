import React,{Component} from 'react';
import '../css/App.css';
import ChallengeList from './ChallengeList'
import { Segment,Table } from 'semantic-ui-react'

class TestChallenges extends Component {

    render() {

      return (

      <div >
      <Segment style={{ height: 400, overflow: 'auto' }} textAlign='left' attached>
      <Table celled >
       <Table.Body>
          <ChallengeList {...this.props.challenges}/>
        </Table.Body>
        </Table>
        </Segment>
    </div>


        )
      }
    }

export default TestChallenges
