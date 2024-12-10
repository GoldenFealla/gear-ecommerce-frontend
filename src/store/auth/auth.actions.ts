import { createAction, props } from '@ngrx/store';

import { UserInfo } from 'src/shared/models/auth';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGOUT = '[Auth] Logout',
}

export const AuthActions = {
    Login: createAction(
        AuthActionTypes.LOGIN,
        props<{ userInfo: UserInfo | null }>()
    ),
    Logout: createAction(AuthActionTypes.LOGOUT),
};
