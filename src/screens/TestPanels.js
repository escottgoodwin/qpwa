import React,{Component} from 'react'
import '../css/App.css'
import { Query } from "react-apollo"

import {PANEL_QUERY} from '../ApolloQueries'

import TestHeader from '../components/TestHeader'
import PanelList from '../components/PanelList2'
import Error from '../components/Error'
import Loading from './Loading'

class TestPanels extends Component {

  render() {

    const { test_id } = this.props.location.state

      return (
        <div className="main">
        <div className="container">
        <TestHeader testId={test_id} />
        <hr />
        <Query query={PANEL_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error {...error} />

              const testToRender = data.test

          return (


                <PanelList {...testToRender}/>


)
}


}
</Query>

  </div>

</div>
)
}
}



export default TestPanels
