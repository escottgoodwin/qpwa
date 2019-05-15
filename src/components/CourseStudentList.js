import _ from 'lodash'
import '../css/App.css';
import React, { Component } from 'react'
import { Segment, Table } from 'semantic-ui-react'

class StudentCourseList extends Component {
  state = {
    column: null,
    data: this.props.students,
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
      <h4>Enrolled Students</h4>
    <Table sortable celled fixed  >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'name' ? direction : null}
              onClick={this.handleSort('firstName')}
            >
              First Name
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === 'name' ? direction : null}
              onClick={this.handleSort('lastName')}
            >
              Last Name
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
          {_.map(data, ({ id, firstName, lastName, percentCorrect }) => (
            <Table.Row key={id}>
              <Table.Cell>{firstName}</Table.Cell>
              <Table.Cell>{lastName}</Table.Cell>
              <Table.Cell>{Math.round(percentCorrect*100)}%</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
    )
  }
}

export default StudentCourseList
