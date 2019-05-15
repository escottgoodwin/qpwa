import React,{Component} from 'react'
import '../css/App.css'
import { Query } from "react-apollo"

import {PANEL_QUERY} from '../ApolloQueries'

import TestHeaderStudent from '../components/TestHeaderStudent'
import PanelList from '../components/PanelList2'
import Error from '../components/Error'
import Loading from './Loading'

class StudentTestPanels extends Component {

  render() {

    const { test_id } = this.props.location.state

      return (


      <Query query={PANEL_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error {...error} />

              const testToRender = data.test

          return (
            <div className="main">
      <div className="container">
      <div className="coursecontainer">

      <TestHeaderStudent {...testToRender}/>

      <div style={{padding:'15px'}}>

      <div className="coursecontainer">

      <PanelList {...testToRender}/>

      </div>
    </div>
    </div>
    </div>


</div>

)
}


}
</Query>
)
}
}



export default StudentTestPanels
