import { createReducer, on } from '@ngrx/store';

import { AuthState } from './auth.state';
import { AuthActions } from './auth.actions';

const initialState: AuthState = {
  userInfo: null,
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.Login, (state, { userInfo }) => ({
    userInfo: userInfo,
  })),
  on(AuthActions.Logout, (state) => ({
    userInfo: null,
  }))
);
