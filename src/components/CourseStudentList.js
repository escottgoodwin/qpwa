import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const classes = {
  root: {
    width: '100%',
    marginTop: 10,
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
};

function CourseStudentList(props) {
  const rows = props.students
  return (
    <Paper style={{marginTop:20,marginLeft:30,marginRight:30,marginBottom:5,padding:10}}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>

            <TableCell style={{fontSize:14}} align="left">First Name</TableCell>
            <TableCell style={{fontSize:14}} align="left">Last Name</TableCell>
            <TableCell style={{fontSize:14}} align="left">Acurracy</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>

              <TableCell style={{fontSize:16}} align="left">{row.firstName}</TableCell>
              <TableCell style={{fontSize:16}} align="left">{row.lastName}</TableCell>
              <TableCell style={{fontSize:16}} align="left">{row.percentCorrect}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default CourseStudentList;
