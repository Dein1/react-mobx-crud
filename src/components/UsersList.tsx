import * as React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { Link } from "react-router-dom";
import UsersStore  from './UsersStore';

interface UsersProps {
  store: UsersStore
}

interface User {
  guid: string;
  age: number;
  name: {
    first: string,
    last: string,
  };
  email: string;
}

export default class UsersList extends React.Component<UsersProps, {}> {
  render() {
    const users: User[] = this.props.store.users;  
    return (
      <div style={{ width: '70%' }}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((el: any, index: number) => {
                return (<TableRow key={el.guid}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{el.name.first}</TableCell>
                  <TableCell>{el.name.last}</TableCell>
                  <TableCell>{el.age}</TableCell>
                  <TableCell>
                    <Link to='/edit'>Edit</Link><a> </a>
                    <a href="#" onClick={() => this.props.store.deleteUser(el.guid)}>Delete</a>
                  </TableCell>
                </TableRow>);
                })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}