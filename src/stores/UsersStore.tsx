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

  @action public editUser(guid: string, editedUser: User) {
    const userToEdit = this.users.find(el => el.guid === guid);
    const index = this.users.indexOf(userToEdit);
    const updatedUser = { ...userToEdit, ...editedUser };
    this.users[index] = updatedUser;
  }

  public findUser(position: number) {
    const user = this.users[position - 1];
    return user;
  }
}
