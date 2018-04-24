import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import UserForm from './UserForm';
import UsersList from './UsersList';
import UsersStore from '../stores/UsersStore';
import Button from 'material-ui/Button';
import { inject } from 'mobx-react';

interface AppProps {
  store?: UsersStore;
}

@inject('store')
export default class App extends React.Component<AppProps, {}> {
    
  private rootLink = (props: any) => <Link to="/" {...props} />;
  private createEditForm = (props: any) => <UserForm {...props} isEditing={true} />;
  private createNewForm = (props: any) => <UserForm {...props} isEditing={false} match={null} />;
  
  render() {
    return (
      <div className="app">
        <Switch>
          <Route 
            exact={true}
            path="/"
            component={UsersList} />
          <Route 
            path="/edit/:number"
            render={this.createEditForm} />
          <Route 
            path="/new"
            render={this.createNewForm} />
        </Switch>
        <br />
        <Button variant="raised" color="primary" component={this.rootLink} >
          home
        </Button>
      </div>
    );
  }
}
