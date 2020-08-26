export interface User {
  _id?: string;
  name: string;
  image: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
