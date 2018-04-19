import * as React from 'react';
import { NavLink, BrowserRouter } from 'react-router-dom';
import Hello from './Hello';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Button variant="raised" color="primary">
            Hello World
          </Button>
          <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        </div>
      </BrowserRouter>
    );
  }
}
