export interface Schedule {
  id: number;
  createdAt: string;
  returnAt: string | null;
  status: string;
  clientTel: string;
  paid: number;
  clientEmail: string;
  cost: number;
  note: string;
  clientId: number;
  paymentType: string;
  clientName: string;
  userId: string;
  discount: number;
  brandName: string;
  sizeName: string;
  colorName: string;
  materialName: string;
  userName: string;
  scheduleDetailShoeServiceAsString: string;
}
