import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import UserForm from './UserForm';
import UsersList from './UsersList';
import Button from 'material-ui/Button';
import UsersStore from './UsersStore';

interface AppProps {
  store: UsersStore;
}

export default class App extends React.Component<AppProps, {}> {
  render() {
    const store = this.props.store;
    const myLink = (props: any) => <Link to="/" {...props} />;
    return (
        <div>
          <Switch>
            <Route 
              exact path="/" 
              render={() => (<UsersList store={store}/>)} />
            <Route 
              path="/edit/:number"
              render={props => 
                (<UserForm {...props} 
                  store={store} 
                  isEditing={true} />)} />
            <Route 
              path="/new" 
              render={props => 
                (<UserForm {...props}
                  store={store} 
                  isEditing={false}
                  match={null} />)} />
          </Switch>
          <br />
          <Button variant="raised" color="primary" component={myLink} >
            home
          </Button>
        </div>
    );
  }
}
