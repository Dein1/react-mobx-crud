import * as React from 'react';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';


export default class MainTable extends React.Component<{}, {}> {
  render() {
    <TableHead>
      <TableRow>
        <TableCell>#</TableCell>
        <TableCell>First Name</TableCell>
        <TableCell>Last Name</TableCell>
        <TableCell>Age</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  }
}