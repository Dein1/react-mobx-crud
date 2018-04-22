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

export default class UserForm extends React.Component<UserFormProps, any> {
  
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
    if (this.props.isEditing) {
      this.props.store.editUser(
        this.state.guid, 
        this.state.firstName, 
        this.state.lastName, 
        this.state.age);
      return;
    }
    const id = Guid.raw();
    this.props.store.addUser({
      guid: id,
      age: this.state.age,
      name: {
        first: this.state.firstName,
        last: this.state.lastName,
      },
      email: 'email',
    });
  }

  render() {
    const { firstName, lastName, age } = this.state;
    const isEnabled = firstName.length > 0 && lastName.length > 0;
    const myLink = (props: any) => <Link to="/" {...props}/>;
    
    return (
      <div><form>
        <TextField 
          id="firstname" 
          type="text"
          label="First name"
          required={true}
          value={firstName}
          onChange={this.handleFirstNameChange}/>
        <br /><br />
        <TextField 
          id="lastname" 
          type="text"
          label="Last name"
          required={true}
          value={lastName}
          onChange={this.handleLastNameChange}/>
        <br /><br />
        <TextField
          id="age"
          type="number"
          label="Age"
          value={age}
          onChange={this.handleAgeChange}
        />
      <br /><br />
      <Button 
        variant="raised"
        color="primary" 
        disabled={!isEnabled}
        component={myLink}
        onClick={() => this.save()}>
          save
      </Button>
    </form>
    </div>);
  }
}
