import { observable } from 'mobx';
import { User } from './UserInterface';

export default class FormStore {
  @observable public user: User;
  @observable public firstName: string;
  @observable public lastName: string;
  @observable public age: number;
  @observable public supervisor: string;

  constructor(user?: User) {
    this.user = user;
    this.firstName = this.user.name.first;
    this.lastName = this.user.name.last;
    this.age = this.user.age;
    this.supervisor = this.user.supervisorGuid || '';
  }
}
