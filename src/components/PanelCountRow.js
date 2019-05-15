import React, {Component} from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom'

export default class PanelCountRow extends Component {

  componentDidMount() {
    //this.props.subscribeToNewPanelCount()
  }

  render(){

    return (
      <div>
      <h6>Panels: <Link  to={{
        pathname: "/test_panels",
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
