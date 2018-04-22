import { observable, action } from 'mobx';

interface User {
  guid: string;
  age: number;
  name: {
    first: string,
    last: string,
  };
  email: string;
}

export default class UsersStore {
  @observable public users: User[];

  constructor(users: User[]) {
    this.users = users;
  }

  @action public deleteUser(guid: string) {
    const userToDelete = this.users.find(el => el.guid === guid);
    const index = this.users.indexOf(userToDelete);
    this.users.splice(index, 1);
  }

  @action public addUser(user: User) {
    this.users.push(user);
  }

  @action public editUser(guid: string, firstName: string, lastName: string, age: number) {
    const userToEdit = this.users.find(el => el.guid === guid);
    const index = this.users.indexOf(userToEdit);
    this.users[index].name.first = firstName;
    this.users[index].name.last = lastName;
    this.users[index].age = age;
  }

  public findUser(index: number) {
    const user = this.users[index - 1];
    return user;
  }
}
