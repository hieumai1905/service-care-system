export interface Product {
  productDetailId: number;
  id: number;
  name: string;
  image: string;
  code: string;
  createAt: Date;
  description: string;
  productCategoryId: number;
  productCategoryName: string;
  status: string;
  rangePrice: number;
  quantity: number;
}
