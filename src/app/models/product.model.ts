export interface Product {
  _id?: string;
  image: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductCart extends Product {
  quantity: number;
}

