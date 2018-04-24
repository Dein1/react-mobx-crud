import { observable } from 'mobx';

interface User {
  guid: string;
  age: number;
  name: {
    first: string,
    last: string,
  };
  email: string;
  supervisorGuid?: string;
}

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

  public isButtonEnabled = () => 
    (this.firstName.length > 0)
    && (this.lastName.length > 0) 
    && (this.age < 121 && this.age > 0)
}
