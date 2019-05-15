import React, {Component} from 'react';
import '../css/App.css';

export default class AnswerCountRow extends Component {

  componentDidMount() {
    //this.props.subscribeToNewAnswerCount()
  }

  render(){
    const { answersCount, accuracy } = this.props
    return (
      <>
      <div>
      <h6>
        Answers: { answersCount  }
      </h6>
      </div>

      <div>
      <h6>
        Accuracy: { Math.round(accuracy * 100)}%
      </h6>
      </div>
      </>
    )
  }
}
