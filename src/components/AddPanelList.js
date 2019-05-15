import React,{Component} from 'react';
import '../css/App.css';
import { Query } from "react-apollo";
import Error from './Error'
import { Loader } from 'semantic-ui-react'
import AddPanelSubList from './AddPanelSubList'

import { TEST_PANEL_STATS_QUERY, NEW_PANEL_SUBSCRIPTION } from '../ApolloQueries'

class AddPanelList extends Component {

  render(){
    const { testId } = this.props
    return (

      <Query query={TEST_PANEL_STATS_QUERY} variables={{ testId: testId }} fetchPolicy="network-only">
            {({ loading, error, data, subscribeToMore }) => {
              if (loading) return <Loader />
              if (error) return <Error error={error} />

                const testPanelStats = data.testPanelStats

          return (

            <AddPanelSubList panelStats={testPanelStats} testId={testId}
              subscribeToNewPanels={() =>
                subscribeToMore({
                  document: NEW_PANEL_SUBSCRIPTION,
                  variables: {testId: testId },
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev
                    let newPanel = subscriptionData.data.newPanel
                    return {
                      testPanelStats:  [...prev.testPanelStats, newPanel]
                  }
                }
              })
            }
            />

          )
        }}
      </Query>
    )
  }

}

export default AddPanelList
