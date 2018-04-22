import * as React from 'react';
import { observer } from 'mobx-react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import UsersStore  from './UsersStore';

interface UsersListProps {
  store: UsersStore;
}

@observer
export default class UsersList extends React.Component<UsersListProps, {}> {
  render() {
    const store = this.props.store;  
    
    const tableHead = 
      (<TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>);

    const tableBody = 
      (<TableBody>
        {store.users.map((el: any, index: number) => {
          return (<TableRow key={el.guid}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{el.name.first}</TableCell>
            <TableCell>{el.name.last}</TableCell>
            <TableCell>{el.age}</TableCell>
            <TableCell>
              <Link to={`/edit/${index + 1}`} >Edit</Link><a> </a>
              <a 
                href="#" 
                onClick={() => this.props.store.deleteUser(el.guid)}>Delete
              </a>
            </TableCell>
          </TableRow>);
        })}
      </TableBody>);

    const newUserLink = (props: any) => <Link to="/new" {...props} />;

    return (
      <div style={{ width: '70%' }}>
        <Paper>
          <Table>
            {tableHead}
            {tableBody}
          </Table>
        </Paper>
        <br />
        <Button variant="raised" color="primary" component={newUserLink}>
          new user
        </Button>
      </div>
    );
  }
}
