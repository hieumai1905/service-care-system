import {OrderDetail} from "./OrderDetail";

export interface Order {
  createdAt: string;
  total: number;
  discount: number;
  paymentType: string;
  note: string;
  clientId: number;
  couponItemId: number | null;
  userId: string;
  orderDetails: OrderDetail[];
  id: number;
  userFullName: string;
  couponCode: string | null;
  clientName: string;
  couponIsPercent: boolean;
  status: string;
}
