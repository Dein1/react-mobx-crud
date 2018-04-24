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

@inject('store')
@observer
export default class UsersList extends React.Component<UsersListProps, {}> {

  private newUserLink = (props: any) => <Link to="/new" {...props} />;
  
  private tableHead = (
    <TableHead>
      <TableRow>
        <TableCell>#</TableCell>
        <TableCell>First Name</TableCell>
        <TableCell>Last Name</TableCell>
        <TableCell>Age</TableCell>
        <TableCell>Supervisor</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    );

  private generateTableContent = () => this.props.store.users.map((el: any, index: number) => {
    const deleteUser = () => this.props.store.deleteUser(el.guid);
    const supervisor = el.supervisorGuid ? this.props.store.findUser(el.supervisorGuid) : null;
    const supervisorToShow = 
      supervisor === null 
      ? '' 
      : `${supervisor.name.first} ${supervisor.name.last}`;

    return (
        <TableRow key={el.guid}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{el.name.first}</TableCell>
          <TableCell>{el.name.last}</TableCell>
          <TableCell>{el.age}</TableCell>
          <TableCell>{supervisorToShow}</TableCell>
          <TableCell>
            <Link to={`/edit/${index + 1}`} >Edit</Link>
            {' '}
            <Link to="#" onClick={deleteUser}>Delete</Link>
          </TableCell>
        </TableRow>
    );
  })

  render() {
    return (
      <div>
        <Paper>
          <Table>
            {this.tableHead}
            <TableBody>
              {this.generateTableContent()}
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
