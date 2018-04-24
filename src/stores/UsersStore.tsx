import { observable, action } from 'mobx';
import { User } from './UserInterface';

export default class UsersStore {
  @observable public users: User[];

  constructor(users: User[]) {
    this.users = users;
  }

  @action public deleteUser(guid: string) {
    const userToDelete = this.users.find(el => el.guid === guid);
    const index = this.users.indexOf(userToDelete);
    this.users.splice(index, 1);
    this.users.map((el) => {
      if (el.supervisorGuid && el.supervisorGuid === guid) {
        delete el.supervisorGuid;
      }
    });
  }

  @action public addUser(user: User) {
    this.users.push(user);
  }

  @action public editUser(editedUser: User) {
    const userToEdit = this.users.find(el => el.guid === editedUser.guid);
    const index = this.users.indexOf(userToEdit);
    const updatedUser = { ...userToEdit, ...editedUser };
    this.users[index] = updatedUser;
  }

  public findByPosition(position: number) {
    const user = this.users[position - 1];
    return user;
  }
  
  public findUser(guid: string) {
    const user = this.users.find(el => el.guid === guid);
    return user;
  }
}
