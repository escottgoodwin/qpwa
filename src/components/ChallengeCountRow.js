import React, {Component} from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom'

export default class ChallengeCountRow extends Component {

  componentDidMount() {
    //this.props.subscribeToNewChallengeCount()
  }

  render(){

    return (
      <div>
      <h6>Challenges: <Link  to={{
        pathname: "/challenge_dashboard",
        state:
          {
            test_id: this.props.testId }
        }} >
         { this.props.count }
      </Link>
      </h6>
      </div>

    )
  }
}
