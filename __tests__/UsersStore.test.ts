import UsersStore from '../src/stores/UsersStore';

interface User {
  guid: string;
  age: number;
  name: {
    first: string,
    last: string,
  };
  email: string;
  supervisorGuid: string;
}

describe('UsersStore', () => {
  const testUser1: User = {
    guid: 'guid1', 
    age: 18,
    name: {
      first: 'first',
      last: 'last',
    },
    email: 'email',
    supervisorGuid: '',
  };

  const testUser2: User = {
    guid: 'guid2', 
    age: 18,
    name: {
      first: 'first',
      last: 'last',
    },
    email: 'email',
    supervisorGuid: '',
  };

  const testUser3: User = {
    guid: 'guid2', 
    age: 75,
    name: {
      first: 'TestFirstName',
      last: 'TestLastName',
    },
    email: 'email',
    supervisorGuid: '',
  };

  const storeData: User[] = [{
    guid: '10e49a2b-0910-49a4-94aa-f29311fd0f79',
    age: 37,
    name: {
      first: 'Flowers',
      last: 'Hatfield',
    },
    email: 'flowers.hatfield@undefined.us',
    supervisorGuid: '',
  }, {
    guid: '69827b93-1b7a-4475-9b27-5caffdf5257e',
    age: 37,
    name: {
      first: 'Whitney',
      last: 'Pope',
    },
    email: 'whitney.pope@undefined.net',
    supervisorGuid: '',
  }];

  const store = new UsersStore(storeData);

  it('create new users', () => {
    expect(store.users.length).toBe(2);
    store.addUser(testUser1);
    expect(store.users.length).toBe(3);
    expect(store.users[store.users.length - 1]).toEqual(testUser1);
    store.addUser(testUser2);
    expect(store.users.length).toBe(4);
  });

  it('delete users', () => {
    expect(store.users.length).toBe(4);
    store.deleteUser('guid1');
    expect(store.users.length).toBe(3);
    store.deleteUser('guid2');
    expect(store.users.length).toBe(2);
  });

  it('edit user', () => {
    store.addUser(testUser1);
    expect(store.users.length).toBe(3);
    store.editUser('guid1', testUser3);
    const last = store.users.length - 1;
    expect(store.users[last].name.first).toBe('TestFirstName');
    expect(store.users[last].name.last).toBe('TestLastName');
    expect(store.users[last].age).toBe(75);
    expect(store.users.length).toBe(3);
  });
});
