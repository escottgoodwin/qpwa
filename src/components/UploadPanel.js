import React,{Component} from 'react';
import '../css/App.css';
import { Image, Button, Dimmer, Header } from 'semantic-ui-react'
import { Mutation } from "react-apollo"
import {DELETE_PANEL, TEST_PANEL_STATS_QUERY, PANEL_COUNT_QUERY} from '../ApolloQueries'

class UploadPanel extends Component {
  state = {}

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  render() {
    const { active } = this.state
    const content = (
      <div>
        <Header as='h2' inverted>
          Title
        </Header>

        <Mutation
            mutation={DELETE_PANEL}
            variables={{ panelId:this.props.id}}
            onError={error => this._error (error)}
            refetchQueries={() => { return [{
                query: TEST_PANEL_STATS_QUERY,
                variables: { testId: this.props.test_id }},
                {
                query: PANEL_COUNT_QUERY,
                variables: { testId: this.props.test_id }}
              ]
              }}
            >
            {mutation => (
              <div style={{padding:'15px'}}>
              <Button color='red' onClick={mutation}>Delete</Button>
              </div>
            )}
          </Mutation>


      </div>
    )

    return (
      <div style={{padding:"5px"}}>
      <Dimmer.Dimmable
             as={Image}
             dimmed={active}
             dimmer={{ active, content }}
             onMouseEnter={this.handleShow}
             onMouseLeave={this.handleHide}
             size='medium'
             src={this.props.panelLink}
           />
           </div>

)
}

}

export default UploadPanel
