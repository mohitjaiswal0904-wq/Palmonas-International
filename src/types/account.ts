import type { PlateKind } from "./catalog";

export type OrderStatus =
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderLine = {
  productId: string;
  name: string;
  category: string;
  slug: string;
  metalLabel: string;
  size?: string;
  quantity: number;
  unitPrice: number;
  image: string;
  seed: string;
  plate: PlateKind;
};

export type OrderAddress = {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal: string;
  country: string;
  phone: string;
};

export type OrderTimelineEvent = {
  label: string;
  at: string;
  done: boolean;
};

export type Order = {
  id: string;
  number: string;
  placedAt: string;
  status: OrderStatus;
  currency: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  items: OrderLine[];
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  paymentMethod: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  timeline: OrderTimelineEvent[];
};

export type SavedAddress = {
  id: string;
  label: string;
  isDefault: boolean;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal: string;
  country: string;
  phone: string;
};

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
