import * as React from 'react';
import UsersStore  from '../stores/UsersStore';
import { Guid } from 'guid-typescript';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormHelperText, FormControl } from 'material-ui/Form';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import FormStore from '../stores/FormStore';

interface UserFormProps {
  store?: UsersStore;
  match: any;
  isEditing: boolean;
}

@inject('store')
@observer
export default class UserForm extends React.Component<UserFormProps, {}> {
  public form: any;

  constructor(props: UserFormProps) {
    super(props);
    const blankUser = { 
      guid: '',
      age: 18,
      name: {
        first: '',
        last: '',
      },
      email: '',
      supervisorGuid: '',
    };
    const user = this.props.isEditing 
      ? this.props.store.findByPosition(this.props.match.params.number) 
      : blankUser;
    this.form = new FormStore(user);
  }

  private save = () => {
    this.props.isEditing 
    ? this.props.store.editUser({
      age: this.form.age,
      guid: this.form.user.guid,
      email: this.form.user.email,
      supervisorGuid: this.form.supervisor,
      name: {
        first: this.form.firstName,
        last: this.form.lastName,
      },
    }) 
    : this.props.store.addUser({
      age: this.form.age,
      supervisorGuid: this.form.supervisor,
      guid: Guid.raw(),
      name: {
        first: this.form.firstName,
        last: this.form.lastName,
      },
      email: 'email',
    });
  }

  private generateSupervisors = () => this.props.store.users.map((el) => {
    if (this.props.isEditing && (this.form.user.guid === el.guid)) return;
    return (
      <MenuItem key={el.guid} value={el.guid}>
        {`${el.name.first} ${el.name.last}`}
      </MenuItem>
    );
  })

  private rootLink = (props: any) => <Link to="/" {...props}/>;

  private handleChange = (event: any) => this.form[event.target.name] = event.target.value;

  render() {
    return (
      <div>
        <form>
          <TextField 
            name="firstName" 
            type="text"
            label="First name"
            value={this.form.firstName}
            onChange={this.handleChange}/>
          <br /><br />
          <TextField 
            name="lastName" 
            type="text"
            label="Last name"
            value={this.form.lastName}
            onChange={this.handleChange}/>
          <br /><br />
          <TextField
            name="age"
            type="number"
            label="Age"
            inputProps={{ min: '1', max: '120', step: '1' }}
            value={this.form.age}
            onChange={this.handleChange}
          />
          <br /><br />
          <FormControl>
            <Select
              name="supervisor"
              value={this.form.supervisor}
              onChange={this.handleChange}>
              {this.generateSupervisors()}
            </Select>
          </FormControl>
          <FormHelperText>Select supervisor</FormHelperText>
          <br /><br />
          <Button 
            variant="raised"
            color="primary" 
            disabled={!this.form.isButtonEnabled()}
            component={this.rootLink}
            onClick={this.save}>
              save
          </Button>
        </form>
      </div>
    );
  }
}
