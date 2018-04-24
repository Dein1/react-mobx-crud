import * as React from 'react';
import UsersStore  from '../stores/UsersStore';
import { Guid } from 'guid-typescript';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
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
}

@inject('store')
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
        email: user.email,
      };
      return;
    }
    this.state = {
      firstName: '',
      lastName: '',
      age: 18,
      guid: '',
      email: '',
    };
  }

  private handleFirstNameChange = (field: any) => this.setState({ firstName: field.target.value });
  private handleLastNameChange = (field: any) => this.setState({ lastName: field.target.value });
  private handleAgeChange = (field: any) => this.setState({ age: field.target.value });

  private isButtonEnabled = () => 
    (this.state.firstName.length > 0)
      && (this.state.lastName.length > 0) && (this.state.age < 121 && this.state.age > 0)

  private save() {
    const { firstName, lastName, age, guid, email } = this.state;
    this.props.isEditing 
    ? this.props.store.editUser(guid, {
      age,
      guid,
      email,
      name: {
        first: firstName,
        last: lastName,
      },
    }) 
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

  private formSave = () => this.save();

  private rootLink = (props: any) => <Link to="/" {...props}/>;

  render() {
    const { firstName, lastName, age } = this.state;

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
          disabled={!this.isButtonEnabled()}
          component={this.rootLink}
          onClick={this.formSave}>
            save
        </Button>
      </form>
    </div>);
  }
}
