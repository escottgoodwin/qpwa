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

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
  { id: 'firstname', numeric: false, disablePadding: true, label: 'First Name' },
  { id: 'lastname', numeric: false, disablePadding: true, label: 'Last Name' },
  { id: 'accuracy', numeric: true, disablePadding: true, label: 'Accuracy' },
];

function EnhancedTableHead(props) {
  const { order, orderBy } = props;

  return (
      <TableHead>
        <TableRow>

          {headRows.map(row => (
            <TableCell
              key={row.id}
              align='left'
              sortDirection={orderBy === row.id ? order : false}
              style={{fontSize:14}}
            >
            {row.label}

            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }



function CourseStudentList(props) {

  const rows = props.students;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('accuracy');

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }


  return (
    <Paper style={{marginTop:20,marginLeft:30,marginRight:30,marginBottom:5,padding:10}}>


          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .map((row, index) => {

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >

                    <TableCell style={{fontSize:16}} align="left">{row.firstName}</TableCell>
                    <TableCell style={{fontSize:16}} align="left">{row.lastName}</TableCell>
                    <TableCell style={{fontSize:16}} align="left">{row.percentCorrect}</TableCell>

                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>

    </Paper>
  );
}

export default CourseStudentList;
