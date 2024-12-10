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

// Store
import { AuthState } from 'src/store/auth/auth.state';
import { AuthActions } from 'src/store/auth/auth.actions';

export interface LoginDialogState {
    logging: boolean;
    success: boolean;
    message: string;
}

@Injectable()
export class LogoutDialogStore extends ComponentStore<LoginDialogState> {
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
    setLoggingOut = this.updater((state) => ({
        ...state,
        logging: true,
    }));

    setLogoutSuccess = this.updater((state) => ({
        ...state,
        logging: false,
        success: true,
        message: '',
    }));

    setLogoutError = this.updater((state, errorMsg: string) => ({
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
    logout = this.effect<void>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setLoggingOut()),
            exhaustMap(() =>
                this.authService.logout().pipe(
                    tapResponse({
                        next: () => {
                            this.store.dispatch(AuthActions.Logout());
                            this.setLogoutSuccess();
                            toast('Logout Suceeded', {
                                description: 'You successfully logged out',
                            });
                        },
                        error: (error: HttpErrorResponse) => {
                            this.setLogoutError(error.error.message);
                            toast('Logout Failed', {
                                description:
                                    'An error occured while logging out',
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
