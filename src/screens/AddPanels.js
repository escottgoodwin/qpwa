import React,{Component} from 'react'
import '../css/App.css'

import TestHeader from '../components/TestHeader'
import DropZoneUpload from '../components/DropZoneUpload2'
import AddPanelList from '../components/AddPanelList'

class AddPanels extends Component {

    render() {
      const { test_id } = this.props.location.state
      const auth_token = sessionStorage.getItem('auth_token');

      return (
        <div className="main">
        <div className="coursecontainer">

          <TestHeader testId={test_id} />

          <hr/>

          <DropZoneUpload token={auth_token} testId={test_id} />

          <AddPanelList testId={test_id} />

        </div>
        </div>
        )
      }
    }

export default AddPanels
