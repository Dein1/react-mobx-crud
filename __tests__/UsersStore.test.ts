import UsersStore from '../src/components/UsersStore';
import * as TestUtils from 'react-dom/test-utils';


describe('UsersStore', () => {
  const testUser1 = {
    guid: 'guid1', 
    age: 18,
    name: {
      first: 'first',
      last: 'last',
    },
    email: 'email',
  };

  const testUser2 = {
    guid: 'guid1', 
    age: 18,
    name: {
      first: 'first',
      last: 'last',
    },
    email: 'email',
  };

  const storeData = [{
    guid: '10e49a2b-0910-49a4-94aa-f29311fd0f79',
    age: 37,
    name: {
      first: 'Flowers',
      last: 'Hatfield',
    },
    email: 'flowers.hatfield@undefined.us',
  }, {
    guid: '69827b93-1b7a-4475-9b27-5caffdf5257e',
    age: 37,
    name: {
      first: 'Whitney',
      last: 'Pope',
    },
    email: 'whitney.pope@undefined.net',
  }];

  const store = new UsersStore(storeData);

  it('add new users', () => {
    store.addUser(testUser1);
    expect(store.users.length).toBe(3);
    store.addUser(testUser2);
    expect(store.users.length).toBe(4);
  });

  it('delete user', () => {
    store.deleteUser('guid1');
    expect(store.users.length).toBe(3);
    store.deleteUser('guid2');
    expect(store.users.length).toBe(2);
  });
});
