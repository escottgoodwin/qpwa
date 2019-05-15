import _ from 'lodash'
import '../css/App.css';
import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

class InstitutionCoursesTable extends Component {
  state = {
    column: null,
    data: this.props,
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

      <Table sortable celled fixed  >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'name' ? direction : null}
                onClick={this.handleSort('name')}
              >
                Subject
              </Table.HeaderCell>

              <Table.HeaderCell
                sorted={column === 'students' ? direction : null}
                onClick={this.handleSort('questions')}
              >
                Questions
              </Table.HeaderCell>

            </Table.Row>
          </Table.Header>

          <Table.Body>
            {_.map(data, ({ id, subject, questions }) => (
              <Table.Row key={id}>
                <Table.Cell>{subject}</Table.Cell>
                <Table.Cell>{questions.length}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

    )
  }
}

export default InstitutionCoursesTable
