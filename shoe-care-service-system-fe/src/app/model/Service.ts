export interface Service {
  id: number;
  name: string;
  price: number;
  serviceCode: string;
  inputPrice: number;
  sellPrice: number;
  profits: number;
  createAt: string;
  isActive: boolean;
  note: string;
  consumingTime: number;
  categoryServiceId: number;
  brandId: number;
  brandName: string;
  categoryServiceName: string;
}
