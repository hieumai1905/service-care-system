export interface Product {
  id: number;
  name: string;
  image: string;
  code: string;
  inputPrice: number;
  sellPrice: number;
  createAt: Date;
  isActive: boolean;
  description: string;
  quantity: number;
  productCategoryId: number;
  colorId: number;
  sizeId: number;
  productCategoryName: string;
  colorName: string;
  colorHex: string;
  sizeName: string;
}
