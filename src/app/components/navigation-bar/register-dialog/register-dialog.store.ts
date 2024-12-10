import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, tap } from 'rxjs';

// Toast
import { toast } from 'ngx-sonner';

// ngrx
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { Store } from '@ngrx/store';

// Services
import { AuthService } from 'src/shared/services/auth.service';

// Models
import { RegisterForm } from 'src/shared/models/auth';

// Store
import { AuthState } from 'src/store/auth/auth.state';
import { AuthActions } from 'src/store/auth/auth.actions';

export interface RegisterDialogState {
    registering: boolean;
    success: boolean;
    message: string;
}

@Injectable()
export class RegisterDialogStore extends ComponentStore<RegisterDialogState> {
    constructor(
        private authService: AuthService,
        private store: Store<{ auth: AuthState }>
    ) {
        super({
            registering: false,
            success: false,
            message: '',
        });
    }
    // *********** Updaters ************ //
    setRegister = this.updater((state) => ({
        ...state,
        registering: true,
    }));

    setRegisterSuccess = this.updater((state) => ({
        ...state,
        registering: false,
        success: true,
        message: '',
    }));

    setRegisterError = this.updater((state, errorMsg: string) => ({
        ...state,
        registering: false,
        success: false,
        message: errorMsg,
    }));

    // *********** Selectors *********** //
    registering$ = this.select((state) => state.registering);
    success$ = this.select((state) => state.success);
    message$ = this.select((state) => state.message);

    // *********** Effects ************* //
    register = this.effect<RegisterForm>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setRegister()),
            exhaustMap((form) =>
                this.authService.register(form).pipe(
                    tapResponse({
                        next: (value) => {
                            const data = value.data;
                            this.store.dispatch(
                                AuthActions.Login({ userInfo: data.user })
                            );
                            this.setRegisterSuccess();
                            toast('Register Suceeded', {
                                description: 'You successfully Registered',
                            });
                        },
                        error: (error: HttpErrorResponse) => {
                            this.setRegisterError(error.error.message);
                            toast('Register Failed', {
                                description:
                                    'An error occured while registering',
                            });
                        },
                    })
                )
            )
        );
    });

    // *********** ViewModel *********** //
    readonly vm$ = this.select(this.state$, (state) => ({
        registering: state.registering,
        success: state.success,
        message: state.message,
    }));
}
