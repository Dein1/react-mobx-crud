import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import UsersStore from './components/UsersStore'
import parse from './parser'

const data = parse('mates.json');
const store = new UsersStore(data);

ReactDOM.render(
      <App store={store}/>,
    document.getElementById("root")
);
