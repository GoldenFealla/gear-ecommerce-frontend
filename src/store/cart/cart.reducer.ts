import { createReducer, on } from '@ngrx/store';

import { CartState } from './cart.state';
import { CartActions } from './cart.actions';

const initialState: CartState = {
    cart: null,
    processing: false,
    error: '',
};

export const CartReducer = createReducer(
    initialState,
    on(CartActions.GetCart, (state) => ({
        ...state,
        processing: true,
    })),
    on(CartActions.GetCartSuccess, (state, { cart }) => ({
        cart: cart,
        processing: false,
        error: '',
    })),
    on(CartActions.GetCartError, (state, { error }) => ({
        cart: null,
        processing: false,
        error: error,
    }))
);
