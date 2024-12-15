import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';

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
    })),
    immerOn(CartActions.SetQuantity, (state, { gear_id, quantity }) => {
        const gear = state.cart?.order_gear.find((v) => v.gear.id === gear_id);
        if (gear) {
            gear.quantity = quantity;
        }
    }),
    on(CartActions.SetQuantitySuccess, (state) => ({
        ...state,
    })),
    on(CartActions.SetQuantityError, (state, { error }) => ({
        ...state,
        cart: null,
        error: error,
    }))
);
