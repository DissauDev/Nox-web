// src/types/coupon.ts
export type TabType = "active" | "expired" | "deactivated";
export type ExpiredFilter = "used" | "unused";

export interface Coupon {
  id: string;
  discountPercentage: number;
  expiryDate: string;
  code: string;
  limited: boolean;
  available: number;
  total: number | string;
  used: boolean;
  status: TabType; // "active", "expired" o "deactivated"
}
