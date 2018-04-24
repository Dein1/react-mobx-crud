export interface User {
  guid: string;
  age: number;
  name: {
    first: string,
    last: string,
  };
  email: string;
  supervisorGuid?: string;
}
