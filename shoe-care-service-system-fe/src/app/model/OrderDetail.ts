export interface OrderDetail {
  id: number;
  productId: number;
  productName: string;
  image: string | null;
  price: number;
  quantity: number;
}
