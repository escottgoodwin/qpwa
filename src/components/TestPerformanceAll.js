import _ from 'lodash'
import '../css/App.css';
import React, { Component } from 'react'
import { Segment, Table } from 'semantic-ui-react'

class TestPerformanceAll extends Component {
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
      <Segment style={{ minHeight: 400, overflow: 'auto' }} attached>

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
                  <Table.Cell>{Math.round(percentCorrect*100)}%</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
    </Segment>
    )
  }
}

export default TestPerformanceAll
