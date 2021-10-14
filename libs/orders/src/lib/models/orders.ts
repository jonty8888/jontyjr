import { OrderItem } from './orders-item';
import { User } from '@jontyjr/users';

export interface Order {
  id?: string;
  orderItems: OrderItem[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalPrice?: string;
  user?: any;
  dateOrdered?: string;
}
