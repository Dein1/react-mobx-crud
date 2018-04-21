import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import UsersStore from './components/UsersStore';
import parse from './parse';

declare global {
  interface Window { store: any; }
}

const data = parse('mates.json');
const store = window.store = new UsersStore(data);

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root'),
);
