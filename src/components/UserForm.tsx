import * as React from 'react';
import UsersStore  from './UsersStore';
import { Guid } from 'guid-typescript';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';

interface UserFormProps {
  store: UsersStore;
  match: any;
  isEditing: boolean;
}

interface FormState {
  firstName: string;
  lastName: string;
  age: number;
  guid: string;
}

export default class UserForm extends React.Component<UserFormProps, FormState> {
  
  constructor(props: UserFormProps) {
    super(props);
    if (props.isEditing) {
      const user = props.store.findUser(props.match.params.number);
      this.state = {
        firstName: user.name.first,
        lastName: user.name.last,
        age: user.age,
        guid: user.guid,
      };
      return;
    }
    this.state = {
      firstName: '',
      lastName: '',
      age: 18,
      guid: '',
    };
  }

  private handleFirstNameChange = (field: any) => this.setState({ firstName: field.target.value });
  private handleLastNameChange = (field: any) => this.setState({ lastName: field.target.value });
  private handleAgeChange = (field: any) => this.setState({ age: field.target.value });

  private save() {
    const { firstName, lastName, age, guid } = this.state;
    this.props.isEditing 
    ? this.props.store.editUser(guid, firstName, lastName, age) 
    : this.props.store.addUser({
      age,
      guid: Guid.raw(),
      name: {
        first: firstName,
        last: lastName,
      },
      email: 'email',
    });
  }

  render() {
    const { firstName, lastName, age } = this.state;
    const isButtonEnabled = firstName.length > 0 && lastName.length > 0 && (age < 121 && age > 0);
    const rootLink = (props: any) => <Link to="/" {...props}/>;
    const save = () => this.save();

    return (
      <div>
        <form>
          <TextField 
            id="firstname" 
            type="text"
            label="First name"
            value={firstName}
            onChange={this.handleFirstNameChange}/>
          <br /><br />
          <TextField 
            id="lastname" 
            type="text"
            label="Last name"
            value={lastName}
            onChange={this.handleLastNameChange}/>
          <br /><br />
          <TextField
            id="age"
            type="number"
            label="Age"
            inputProps={{ min: '1', max: '120', step: '1' }}
            value={age}
            onChange={this.handleAgeChange}
          />
        <br /><br />
        <Button 
          variant="raised"
          color="primary" 
          disabled={!isButtonEnabled}
          component={rootLink}
          onClick={save}>
            save
        </Button>
      </form>
    </div>);
  }
}
