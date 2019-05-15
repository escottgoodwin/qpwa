import _ from 'lodash'
import '../css/App.css';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Table } from 'semantic-ui-react'

class InstitutionCoursesPersonnel extends Component {
  state = {
    column: null,
    data: this.props.courses,
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
      <Segment style={{ height: 400, overflow: 'auto' }} attached>
      <Table sortable celled fixed  >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'name' ? direction : null}
                onClick={this.handleSort('name')}
              >
                Name
              </Table.HeaderCell>

              <Table.HeaderCell
                sorted={column === 'students' ? direction : null}
                onClick={this.handleSort('students')}
              >
                Institution
              </Table.HeaderCell>

              <Table.HeaderCell
                sorted={column === 'students' ? direction : null}
                onClick={this.handleSort('students')}
              >
                Students
              </Table.HeaderCell>

            </Table.Row>
          </Table.Header>

          <Table.Body>
            {_.map(data, ({ id, name, institution, students }) => (
              <Table.Row key={id}>
                <Table.Cell>
                <Link  to={{
                  pathname: "/institution_course",
                  state:
                  { institutionId: this.props.institutionId, courseId: id }
                  }} >
                  {name}
                  </Link></Table.Cell>
                  <Table.Cell>{institution.name}</Table.Cell>
                <Table.Cell>{students.length}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    )
  }
}

export default InstitutionCoursesPersonnel
