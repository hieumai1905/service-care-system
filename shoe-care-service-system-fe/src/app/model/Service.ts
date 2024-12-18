export interface Service {
  id: number;
  name: string;
  price: number;
  serviceCode: string;
  createAt: string;
  isActive: boolean;
  note: string;
  consumingTime: number;
  categoryServiceId: number;
  brandId: number;
  brandName: string;
  categoryServiceName: string;
}
