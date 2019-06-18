import React,{Component} from 'react';
import '../css/App.css';

import { Query } from "react-apollo";
import {TEST_PANEL_STATS_QUERY} from '../ApolloQueries'

import LazyLoad from 'react-lazyload';

import PanelRow from './PanelRow1'


class PanelList extends Component {

  render() {

      return (

        <Query query={TEST_PANEL_STATS_QUERY} variables={{ testId: this.props.id }}>
              {({ loading, error, data }) => {
                if (loading) return <div style={{height:'75vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div>{JSON.stringify(error)}</div>

                const panelStats = data.testPanelStats

            return (

              <div >

              {panelStats.map(panel =>
                <LazyLoad throttle={200} once={true} key={panel.id} height={200} offset={[-100, 0]}>

                <PanelRow  classes={this.props.classes} key={panel.panelLink} test={this.props} {...panel} />

                </LazyLoad>
                )}

              </div>

              )
            }

          }
        </Query>
)
}
}

export default PanelList
