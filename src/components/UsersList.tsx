import * as React from 'react';
import { observer, inject } from 'mobx-react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import UsersStore  from '../stores/UsersStore';

interface UsersListProps {
  store?: UsersStore;
}

@observer
@inject('store')
export default class UsersList extends React.Component<UsersListProps, {}> {

  private newUserLink = (props: any) => <Link to="/new" {...props} />;

  render() {
    const store = this.props.store;
    
    const tableHead = (
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Age</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      );
    
    const tableBodyContent = store.users.map((el: any, index: number) => {
      const deleteUser = () => store.deleteUser(el.guid);
      return (
          <TableRow key={el.guid}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{el.name.first}</TableCell>
            <TableCell>{el.name.last}</TableCell>
            <TableCell>{el.age}</TableCell>
            <TableCell>
              <Link to={`/edit/${index + 1}`} >Edit</Link>
              {' '}
              <Link to="#" onClick={deleteUser}>Delete</Link>
            </TableCell>
          </TableRow>
      );
    });

    return (
      <div>
        <Paper>
          <Table>
            {tableHead}
            <TableBody>
              {tableBodyContent}
            </TableBody>
          </Table>
        </Paper>
        <br />
        <Button variant="raised" color="primary" component={this.newUserLink}>
          new user
        </Button>
      </div>
    );
  }
}
