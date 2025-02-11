export type OrderStatus = 'Delivered' | 'Processing' | 'Cancelled';
export type OrderDate = 'A day ago' | 'A week ago' | 'A month ago';

export interface IUser {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role?: string;
}
export interface IUserData extends IUser {
  _id?: string;
  password: string;
}

export interface ICategory {
  _id: string;
  categoryName: string;
  categoryDescription: string;
  categoryImage: string;
}

export interface IProduct {
  _id: string;
  productName: string;
  productDescription: string;
  productImage: string;
  price: number;
  quantity: number;
  categoryId: ICategory;
  discount?: number;
}

export interface ICreateCart {
  productId: string;
  itemAmount: number;
}

export interface ICart {
  _id: string;
  productId: IProduct;
  itemAmount: number;
}

export interface ICreateOrder {
  orderAmount: number;
  products: {
    productId: string;
    productPrice: number;
    discountApplied?: number;
    itemAmount: number;
  }[];
  receiverAddress: string;
  receiverPhoneNumber: string;
}
export interface IOrder {
  _id: string;
  orderName: string;
  orderAmount: number;
  orderStatus: OrderStatus;
  createdAt: Date;
  products: {
    productId: IProduct;
    productPrice: number;
    discountApplied: number;
    itemAmount: number;
  }[];
  receiverAddress: string;
  receiverPhoneNumber: string;
}

export interface IFilterState {
  statusFilter: OrderStatus | null;
  dateFilter: OrderDate | null;
  amountFilter: string;
  orderName: string;
}
