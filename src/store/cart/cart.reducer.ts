import { createReducer, on } from '@ngrx/store';

import { CartState } from './cart.state';
import { CartActions } from './cart.actions';
import { error } from 'console';

const initialState: CartState = {
    cart: null,
    loading: false,
    error: '',
};

export const CartReducer = createReducer(
    initialState,
    on(CartActions.GetCart, (state) => ({
        ...state,
        loading: true,
    })),
    on(CartActions.GetCartSuccess, (state, { cart }) => ({
        cart: cart,
        loading: false,
        error: '',
    })),
    on(CartActions.GetCartError, (state, { error }) => ({
        cart: null,
        loading: false,
        error: error,
    }))
);
