import { createReducer, on } from '@ngrx/store';

import { AuthState } from './auth.state';
import { AuthActions } from './auth.actions';

const initialState: AuthState = {
    isChecked: false,
    userInfo: null,
};

export const AuthReducer = createReducer(
    initialState,
    on(AuthActions.Login, (state, { userInfo }) => ({
        isChecked: true,
        userInfo: userInfo,
    })),
    on(AuthActions.Logout, (state) => ({
        isChecked: true,
        userInfo: null,
    }))
);
