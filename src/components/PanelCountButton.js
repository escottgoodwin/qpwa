import React, {Component} from 'react';
import '../css/App.css';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class PanelCountButton extends Component {

  componentDidMount() {
    //this.props.subscribeToNewPanelCount()
  }

  render(){

    return (


      <Link  to={{
        pathname: "/test_panels",
        state:
          {
            test_id: this.props.testId }
        }} >
        <Button color="blue" >{this.props.count} Panels</Button>
      </Link>

    )
  }
}
