export interface Coupon {
  id: number;
  title: string;
  discount: number;
  requireValue: number;
  isPercent: boolean;
  expireAt: string;
  isActive: boolean;
  numberOfItems: number | null;
}
