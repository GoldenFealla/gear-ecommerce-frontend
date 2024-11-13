import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { exhaustMap, tap } from 'rxjs';

// ngrx
import { Store } from '@ngrx/store';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';

// Services
import { AuthService } from '@shared/services/auth.service';

// Store
import { AuthState } from '@store/auth/auth.state';
import { AuthActions } from '@store/auth/auth.actions';

// Models
import { UserInfo } from '@shared/models/auth';

export interface AppStoreState {
    loading: boolean;
    initiated: boolean;
}

@Injectable()
export class AppStore extends ComponentStore<AppStoreState> {
    constructor(
        private authService: AuthService,
        private store: Store<{ auth: AuthState }>
    ) {
        super({
            loading: false,
            initiated: false,
        });
    }
    // *********** Updaters ************ //
    setLoading = this.updater((state, value: boolean) => ({
        ...state,
        loading: value,
    }));

    setInit = this.updater((state, value: boolean) => ({
        ...state,
        initiated: value,
    }));

    // *********** Selectors *********** //

    // *********** Effects ************* //
    check = this.effect((trigger$) => {
        return trigger$.pipe(
            tap(() => {
                this.setLoading(true);
            }),
            exhaustMap(() =>
                this.authService.logged().pipe(
                    tapResponse({
                        next: (value) => {
                            console.log('Loaded Success');
                            this.store.dispatch(
                                AuthActions.Login({ userInfo: value.data })
                            );
                            this.setLoading(false);
                            this.setInit(true);
                        },
                        error: (error: HttpErrorResponse) => {
                            console.log('Loaded Error');
                            this.store.dispatch(
                                AuthActions.Login({ userInfo: null })
                            );
                            this.setLoading(false);
                            this.setInit(true);
                        },
                    })
                )
            )
        );
    });

    // *********** ViewModel *********** //
    vm$ = this.select(this.state$, (state) => ({
        loading: state.loading,
        initiated: state.initiated,
    }));
}
