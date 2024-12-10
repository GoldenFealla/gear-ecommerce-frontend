import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, tap } from 'rxjs';

// toast
import { toast } from 'ngx-sonner';

// ngrx
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { Store } from '@ngrx/store';

// Services
import { AuthService } from 'src/shared/services/auth.service';

// Models
import { LoginForm, UserInfo } from 'src/shared/models/auth';

// Store
import { AuthState } from 'src/store/auth/auth.state';
import { AuthActions } from 'src/store/auth/auth.actions';

export interface LoginDialogState {
    logging: boolean;
    success: boolean;
    message: string;
}

@Injectable()
export class LoginDialogStore extends ComponentStore<LoginDialogState> {
    constructor(
        private authService: AuthService,
        private store: Store<{ auth: AuthState }>
    ) {
        super({
            logging: false,
            success: false,
            message: '',
        });
    }
    // *********** Updaters ************ //
    setLoggingIn = this.updater((state) => ({
        ...state,
        logging: true,
    }));

    setLoginSuccess = this.updater((state) => ({
        ...state,
        logging: false,
        success: true,
        message: '',
    }));

    setLoginError = this.updater((state, errorMsg: string) => ({
        ...state,
        logging: false,
        success: false,
        message: errorMsg,
    }));

    // *********** Selectors *********** //
    logging$ = this.select((state) => state.logging);
    success$ = this.select((state) => state.success);
    message$ = this.select((state) => state.message);

    // *********** Effects ************* //
    login = this.effect<LoginForm>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setLoggingIn()),
            exhaustMap((loginForm) =>
                this.authService.login(loginForm).pipe(
                    tapResponse({
                        next: (value) => {
                            const data = value.data;
                            this.store.dispatch(
                                AuthActions.Login({ userInfo: data.user })
                            );
                            this.setLoginSuccess();
                            toast('Login Suceeded', {
                                description: 'You successfully logged in',
                            });
                        },
                        error: (error: HttpErrorResponse) => {
                            this.setLoginError(error.error.message);
                            toast('Login Failed', {
                                description: `Error: ${error.error.message}`,
                            });
                        },
                    })
                )
            )
        );
    });

    // *********** ViewModel *********** //
    readonly vm$ = this.select(this.state$, (state) => ({
        logging: state.logging,
        success: state.success,
        message: state.message,
    }));
}
