import React,{Component} from 'react';
import '../css/App.css';
import { Card } from 'semantic-ui-react'

import PanelRow from './PanelRow'

export default class PanelSubList extends Component{

  componentDidMount() {
    this.props.subscribeToNewPanels()
  }

  render(){
    return(
    <Card.Group centered>
      {this.props.panelStats.map(panel =>
        <PanelRow  key={panel.id} {...panel} />
      )}
      </Card.Group>
    )
  }
}
