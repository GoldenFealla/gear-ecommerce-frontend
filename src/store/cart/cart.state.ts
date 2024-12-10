import { FullOrder } from 'src/shared/models/cart';

export type CartState = {
    cart: FullOrder | null;
    loading: boolean;
    error: string;
};
