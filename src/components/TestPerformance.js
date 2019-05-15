import _ from 'lodash'
import '../css/App.css';
import React, { Component } from 'react'
import { Segment, Table } from 'semantic-ui-react'
import { Query } from "react-apollo";
import gql from "graphql-tag";

const TEST_STATS_QUERY = gql`
query TestStats($testId:ID!){
  testStats(testId:$testId){
    totalCorrect
    total

  }
}
`

class TestPerformance extends Component {
  state = {
    column: null,
    data: this.props.stats,
    direction: null,
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  render() {
    const { column, data, direction } = this.state

    return (
      <Segment style={{ minHeight: 400 }} attached>
      <Query query={TEST_STATS_QUERY} variables={{ testId: this.props.testId }}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading</div >
              if (error) return <div>Error</div >

              const stats = data.testStats

          return (

            <div>
              <b>Percent Correct:</b> { stats.totalCorrect/stats.total > 0 ? Math.round(stats.totalCorrect/stats.total*100) : 0.0 }%  <b>Correct:</b> {stats.totalCorrect} <b>Total:</b> {stats.total}
              </div>
            )
          }}
          </Query>

    <Table sortable celled fixed striped >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  sorted={column === 'name' ? direction : null}
                  onClick={this.handleSort('name')}
                >
                  Name
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={column === 'total' ? direction : null}
                  onClick={this.handleSort('total')}
                >
                  Answered
                </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={column === 'totalCorrect' ? direction : null}
                  onClick={this.handleSort('totalCorrect')}
                >
                Correct
              </Table.HeaderCell>

                <Table.HeaderCell
                  sorted={column === 'percentCorrect' ? direction : null}
                  onClick={this.handleSort('percentCorrect')}
                >
                  Percent Correct
                </Table.HeaderCell>

              </Table.Row>
            </Table.Header>

            <Table.Body>
              {_.map(data, ({ id, name, total, totalCorrect, percentCorrect }) => (
                <Table.Row key={id}>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>{total}</Table.Cell>
                  <Table.Cell>{totalCorrect}</Table.Cell>
                  <Table.Cell>{Math.round(percentCorrect *100)}%</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
    </Segment>
    )
  }
}

export default TestPerformance
