import { User } from './user.model';
import { Product } from './product.model';

export interface Order {
  _id?: string;
  buyer: Partial<User>;
  products: {
    product: Partial<Product>,
    quantity: number
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}
