import React,{Component} from 'react';
import '../css/App.css';
import { Card } from 'semantic-ui-react'

import UploadPanel from './UploadPanel'

export default class AddPanelSubList extends Component{

  componentDidMount() {
    this.props.subscribeToNewPanels()
  }

  render(){
    return(
      
      <div >

      <Card.Group centered>

      {Object.values(this.props.panelStats).map(panel =>
        <UploadPanel test_id={this.props.testId} key={panel.panelLink} {...panel}/>)}

      </Card.Group>

      </div>

    )
  }
}
