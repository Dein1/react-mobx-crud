import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import UsersStore from './stores/UsersStore';
import parse from './parse';
import { Provider } from 'mobx-react';

declare global {
  interface Window { db: UsersStore; }
}

const data = parse('mates.json');
const store = window.db = new UsersStore(data);

ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
