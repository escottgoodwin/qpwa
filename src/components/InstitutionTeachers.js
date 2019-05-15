import _ from 'lodash'
import '../css/App.css';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Table } from 'semantic-ui-react'

class InstitutionTeachers extends Component {
  state = {
    column: null,
    data: this.props.teachers,
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
                sorted={column === 'email' ? direction : null}
                onClick={this.handleSort('email')}
              >
                Courses
              </Table.HeaderCell>

            </Table.Row>
          </Table.Header>

          <Table.Body>
            {_.map(data, ({ id, firstName, lastName, teacherCourses }) => (
              <Table.Row key={id}>
              <Table.Cell>
              <Link  to={{
                pathname: "/personnel_dashboard",
                state:
                { userId: id,
                  institutionId: this.props.institutionId }
                }} >
                {firstName}
                </Link><
                /Table.Cell>
              <Table.Cell>
              <Link  to={{
                pathname: "/personnel_dashboard",
                state:
                { userId: id,
                institutionId: this.props.institutionId }
                }} >
                {lastName}
                </Link>
                </Table.Cell>
                <Table.Cell>{teacherCourses.filter(course => !course.deleted).length}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    )
  }
}

export default InstitutionTeachers
