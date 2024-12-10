import { Gear } from './gear';

export const OrderStatusList = [
    'CART',
    'VERIFIED',
    'DELIVERING',
    'DONE',
] as const;

export type OrderStatus = (typeof OrderStatusList)[number];

export type Order = {
    id: string;
    status: string;
    user_id: string;
};

export type OrderGear = {
    gear: Gear;
    quantity: number;
};

export type FullOrder = {
    order: Order;
    order_gear: OrderGear[];
};
