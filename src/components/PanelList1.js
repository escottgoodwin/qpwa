import React,{Component} from 'react';
import '../css/App.css';

import { Query } from "react-apollo";
import {TEST_PANEL_STATS_QUERY} from '../ApolloQueries'

import Fade from '@material-ui/core/Fade';

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
              <Fade in={!loading}>
              <div >

              {panelStats.map(panel =>
                <PanelRow  classes={this.props.classes} key={panel.panelLink} test={this.props} {...panel} />
                )}

              </div>
              </Fade>
              )
            }

          }
        </Query>
)
}
}

export default PanelList
