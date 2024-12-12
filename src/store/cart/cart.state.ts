import { FullOrder } from 'src/shared/models/cart';

export type CartState = {
    cart: FullOrder | null;
    processing: boolean;
    error: string;
};
