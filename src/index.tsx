import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import UsersStore from './components/UsersStore';
import parse from './parse';

declare global {
  interface Window { db: UsersStore; }
}

const data = parse('mates.json');
const store = window.db = new UsersStore(data);

ReactDOM.render(
  <BrowserRouter>
    <App store={store}/>
  </BrowserRouter>,
  document.getElementById('root'),
);
