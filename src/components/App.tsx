import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import UserForm from './UserForm';
import UsersList from './UsersList';
import UsersStore from './UsersStore';
import Button from 'material-ui/Button';

interface AppProps {
  store: UsersStore;
}

export default class App extends React.Component<AppProps, {}> {
  render() {
    const store = this.props.store;
    const rootLink = (props: any) => <Link to="/" {...props} />;
    const createUsersList = () => <UsersList store={store}/>;
    const createEditForm = (props: any) => <UserForm {...props} store={store} isEditing={true} />;
    const createNewForm = (props: any) => 
      <UserForm {...props} store={store} isEditing={false} match={null} />;

    return (
        <div>
          <Switch>
            <Route 
              exact={true}
              path="/"
              render={createUsersList} />
            <Route 
              path="/edit/:number"
              render={createEditForm} />
            <Route 
              path="/new"
              render={createNewForm} />
          </Switch>
          <br />
          <Button variant="raised" color="primary" component={rootLink} >
            home
          </Button>
        </div>
    );
  }
}
