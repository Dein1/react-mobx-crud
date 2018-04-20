import { observable } from 'mobx';

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

  constructor(data: User[]) {
    this.users = data;
  }

  public deleteUser(guid: string) {
    const userToDelete = this.users.find(el => el.guid === guid);
    const index = this.users.indexOf(userToDelete);
    this.users.splice(index, 1);
  }
}