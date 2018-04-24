import * as React from 'react';
import UsersStore  from '../stores/UsersStore';
import { Guid } from 'guid-typescript';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormHelperText, FormControl } from 'material-ui/Form';
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';

interface UserFormProps {
  store?: UsersStore;
  match: any;
  isEditing: boolean;
}

interface FormState {
  firstName: string;
  lastName: string;
  age: number;
  guid: string;
  email: string;
  supervisor: string;
}


@inject('store')
export default class UserForm extends React.Component<UserFormProps, FormState> {
  
  constructor(props: UserFormProps) {
    super(props);
    if (props.isEditing) {
      const user = props.store.findByIndex(props.match.params.number);
      const supervisor = user.supervisorGuid === '' 
        ? props.store.findUser(user.supervisorGuid)
        : { guid: '' };
      this.state = {
        firstName: user.name.first,
        lastName: user.name.last,
        age: user.age,
        guid: user.guid,
        email: user.email,
        supervisor: supervisor.guid,
      };
      return;
    }
    this.state = {
      firstName: '',
      lastName: '',
      age: 18,
      guid: '',
      email: '',
      supervisor: '',
    };
  }

  private handleChange = (event: any) => this.setState({ [event.target.id]: event.target.value });
  private handleSelect = (event?: any) => 
    this.setState({ supervisor: event.target.value })

  private isButtonEnabled = () => 
    (this.state.firstName.length > 0)
      && (this.state.lastName.length > 0) && (this.state.age < 121 && this.state.age > 0)

  private save() {
    const { firstName, lastName, age, guid, email, supervisor } = this.state;
    this.props.isEditing 
    ? this.props.store.editUser(guid, {
      age,
      guid,
      email,
      name: {
        first: firstName,
        last: lastName,
      },
      supervisorGuid: supervisor,
    }) 
    : this.props.store.addUser({
      age,
      guid: Guid.raw(),
      name: {
        first: firstName,
        last: lastName,
      },
      email: 'email',
      supervisorGuid: supervisor,
    });
  }

  private formSave = () => this.save();

  private rootLink = (props: any) => <Link to="/" {...props}/>;

  render() {
    const supervisorsList = this.props.store.users.map((el) => {
      if (this.props.isEditing && (this.state.guid === el.guid)) return;
      return (
        <MenuItem key={el.guid} value={el.guid}>
          {`${el.name.first} ${el.name.last}`}
        </MenuItem>
      );
    });

    return (
      <div>
        <form>
          <TextField 
            id="firstName" 
            type="text"
            label="First name"
            value={this.state.firstName}
            onChange={this.handleChange}/>
          <br /><br />
          <TextField 
            id="lastName" 
            type="text"
            label="Last name"
            value={this.state.lastName}
            onChange={this.handleChange}/>
          <br /><br />
          <TextField
            id="age"
            type="number"
            label="Age"
            inputProps={{ min: '1', max: '120', step: '1' }}
            value={this.state.age}
            onChange={this.handleChange}
          />
          <br /><br />
          <FormControl>
          <Select
            id="supervisor"
            value={this.state.supervisor}
            onChange={this.handleSelect}>
            {supervisorsList}
          </Select>
          </FormControl>
          <FormHelperText>Select supervisor</FormHelperText>
        <br /><br />
        <Button 
          variant="raised"
          color="primary" 
          disabled={!this.isButtonEnabled()}
          component={this.rootLink}
          onClick={this.formSave}>
            save
        </Button>
      </form>
    </div>);
  }
}
