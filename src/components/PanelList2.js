import React,{Component} from 'react'
import '../css/App.css'

import { Loader } from 'semantic-ui-react'
import { Query } from "react-apollo";
import {TEST_PANEL_STATS_QUERY, NEW_PANEL_SUBSCRIPTION} from '../ApolloQueries'

import PanelSubList from './PanelSubList'

import Error from '../components/Error'

class PanelList extends Component {

  render() {
      const { id } = this.props
      return (

        <Query query={TEST_PANEL_STATS_QUERY} variables={{ testId: id }} fetchPolicy="network-only" >
              {({ loading, error, data, subscribeToMore }) => {
                if (loading) return < Loader />
                if (error) return <Error {...error}/>

                const panelStats = data.testPanelStats

            return (
              <PanelSubList panelStats={panelStats}
                subscribeToNewPanels={() =>
                  subscribeToMore({
                    document: NEW_PANEL_SUBSCRIPTION,
                    variables: {testId: id },
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev
                      let newPanel = subscriptionData.data.newPanel
                      return {
                        testPanelStats: [...prev.testPanelStats, newPanel]
                      }
                }
              }
            )
            }
              />
              )
            }
          }
        </Query>
      )
    }
}

export default PanelList
