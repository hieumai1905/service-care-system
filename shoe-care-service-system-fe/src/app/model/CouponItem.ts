export interface CouponItem {
  code: string;
  coupon: {
    expireAt: string;
    isActive: boolean;
    title: string;
    discount: number;
    requireValue: number;
    isPercent: boolean;
    numberOfItems: number | null;
    id: number;
  },
  active: boolean;
}
