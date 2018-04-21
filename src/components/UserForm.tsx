import * as React from 'react';
import UsersStore  from './UsersStore';
import { Guid } from 'guid-typescript';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';


interface UsersProps {
  store: UsersStore;
  match: any;
  isEditing: boolean;
}

export default class UserForm extends React.Component<UsersProps, any> {
  constructor(props: UsersProps) {
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

  handleFirstNameChange = (evt: any) => {
    this.setState({ firstName: evt.target.value });
  }

  handleLastNameChange = (evt: any) => {
    this.setState({ lastName: evt.target.value });
  }

  handleAgeChange = (evt: any) => {
    this.setState({ age: evt.target.value });
  }

  handleSubmit = () => {
    const { firstName, lastName } = this.state;
    console.log(firstName, lastName);
  }
  
  saveUser() {
    if (!this.props.isEditing) {
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
      return;
    }
    this.props.store.editUser(
      this.state.guid, 
      this.state.firstName, 
      this.state.lastName, 
      this.state.age);
  }

  render() {
    const { firstName, lastName, age } = this.state;
    const isEnabled =
      firstName.length > 0 &&
      lastName.length > 0;
    const myLink = (props: any) => <Link to="/" onClick={ e => e.preventDefault() } {...props}/>;

    return (<div><form>
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
        label="Age"
        value={age}
        onChange={this.handleAgeChange}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />
    <br />
    <Button 
      variant="raised"
      color="primary" 
      disabled={!isEnabled}
      component={myLink}
      onClick={() => this.saveUser()}>
        save
    </Button>
  </form>
  </div>);
  }
}
