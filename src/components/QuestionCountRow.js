import React, {Component} from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom'

export default class QuestionCountRow extends Component {

  componentDidMount() {
    //this.props.subscribeToNewQuestionCount()
  }

  render(){
    const { courseId, count, testId } = this.props
    return (
      <div><h6>
      Questions: <Link  to={{
        pathname: "/student_performance",
        state:
          {
            course_id: courseId,
            test_id: testId }
        }} >
         {count}
      </Link>
      </h6>
      </div>

    )
  }
}
