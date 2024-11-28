export interface OrderItem {
  productDetailId: number;
  productId: number;
  productName: string;
  productImage: string;
  colorId: number;
  colorName: string;
  sizeId: number;
  sizeName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  quantityAvailable: number;
}
