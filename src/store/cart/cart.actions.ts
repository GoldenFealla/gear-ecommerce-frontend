import { createAction, props } from '@ngrx/store';

import { FullOrder } from 'src/shared/models/cart';

export enum CartActionTypes {
    GET_CART = '[Cart] Get Cart',
    GET_CART_SUCCESS = '[Cart] Get Cart Success',
    GET_CART_ERROR = '[Cart] Get Cart Error',

    ADD_TO_CART = '[Cart] Add To Cart',
    ADD_TO_CART_SUCCESS = '[Cart] Add To Cart Success',
    ADD_TO_CART_ERROR = '[Cart] Add To Cart Error',

    SET_QUANTITY = '[Cart] Set Quantity',
    SET_QUANTITY_SUCCESS = '[Cart] Set Quantity Success',
    SET_QUANTITY_ERROR = '[Cart] Set Quantity Error',

    REMOVE_FROM_CART = '[Cart] Remove From Cart',
    REMOVE_FROM_CART_SUCCESS = '[Cart] Remove From Cart Success',
    REMOVE_FROM_CART_ERROR = '[Cart] Remove From Cart Error',
}

export const CartActions = {
    GetCart: createAction(CartActionTypes.GET_CART),
    GetCartSuccess: createAction(
        CartActionTypes.GET_CART_SUCCESS,
        props<{ cart: FullOrder }>()
    ),
    GetCartError: createAction(
        CartActionTypes.GET_CART_ERROR,
        props<{ error: any }>()
    ),

    AddToCart: createAction(
        CartActionTypes.ADD_TO_CART,
        props<{ gear_id: string }>()
    ),
    AddToCartSuccess: createAction(CartActionTypes.ADD_TO_CART_SUCCESS),
    AddToCartError: createAction(
        CartActionTypes.ADD_TO_CART_ERROR,
        props<{ error: any }>()
    ),

    SetQuantity: createAction(
        CartActionTypes.SET_QUANTITY,
        props<{ gear_id: string; quantity: number }>()
    ),
    SetQuantitySuccess: createAction(CartActionTypes.SET_QUANTITY_SUCCESS),
    SetQuantityError: createAction(
        CartActionTypes.SET_QUANTITY_ERROR,
        props<{ error: any }>()
    ),

    RemoveFromCart: createAction(
        CartActionTypes.REMOVE_FROM_CART,
        props<{ gear_id: string }>()
    ),
    RemoveFromCartSuccess: createAction(
        CartActionTypes.REMOVE_FROM_CART_SUCCESS
    ),
    RemoveFromCartError: createAction(
        CartActionTypes.REMOVE_FROM_CART_ERROR,
        props<{ error: any }>()
    ),
};
