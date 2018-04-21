import * as React from 'react';
import { observer } from 'mobx-react';
import { FormState, FieldState } from 'formstate';
import UsersStore  from './UsersStore';
import { Guid } from 'guid-typescript';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';


class UserState {
  required = (val:string) => !val && 'All values required';
  form = new FormState({
    firstName: new FieldState('').validators(this.required),
    lastName: new FieldState('').validators(this.required),
    age: new FieldState(1),
  });

  onSubmit = async () => {
    const res = await this.form.validate();
    if (res.hasError) {
      console.log(this.form.error);
      return res;
    }
    console.log('hooray!');
    return res;
  }
}

interface UsersProps {
  store: UsersStore;
}

@observer
export default class UserForm extends React.Component<UsersProps, {}> {
  data = new UserState();
  
  addUser() {
    const id = Guid.raw();
    const res = this.data.onSubmit();
    res.then((res) => {
      if (!res.hasError) {
        this.props.store.addUser({
          guid: id,
          age:  this.data.form.$.age.$,
          name: {
            first: this.data.form.$.firstName.$,
            last: this.data.form.$.lastName.$,
          },
          email: 'string',
        });
      }
    });
  }

  render() {
    const data = this.data;

    const myLink = (props: any) => !this.data.form.error ?
    <Link to="/" onClick={ e => e.preventDefault() } {...props}/>
      : <Link to="/" {...props} />;

    return (<div><form>
      <TextField 
        id="firstname" 
        type="text"
        label="First name"
        value={data.form.$.firstName.value}
        onChange={e => data.form.$.firstName.onChange(e.target.value)}/>
      <br /><br />
      <TextField 
        id="lastname" 
        type="text"
        label="Last name"
        value={data.form.$.lastName.value}
        onChange={e => data.form.$.lastName.onChange(e.target.value)}
        error={data.form.$.lastName.hasError}/>
      <br /><br />
      <TextField
        id="age"
        label="Age"
        value={data.form.$.age.value}
        onChange={e => data.form.$.age.onChange(Number(e.target.value))}
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
      onClick={() => this.addUser()}
      component={myLink}>
      add
    </Button>
  </form>
  </div>);
  }
}
