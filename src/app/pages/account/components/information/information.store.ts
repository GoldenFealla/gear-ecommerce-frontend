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
import { AuthService } from '@services/auth.service';

// Models
import { UpdateUserForm } from '@models/auth';

// Store
import { AuthState } from '@store/auth/auth.state';
import { AuthActions } from '@store/auth/auth.actions';

export interface InfomationState {
    updating: boolean;
    success: boolean;
    message: string;
}

@Injectable()
export class InformationStore extends ComponentStore<InfomationState> {
    constructor(
        private authService: AuthService,
        private store: Store<{ auth: AuthState }>
    ) {
        super({
            updating: false,
            success: false,
            message: '',
        });
    }
    // *********** Updaters ************ //
    setUpdate = this.updater((state) => ({
        ...state,
        updating: true,
    }));

    setUpdateSuccess = this.updater((state) => ({
        ...state,
        updating: false,
        success: true,
        message: '',
    }));

    setUpdateError = this.updater((state, errorMsg: string) => ({
        ...state,
        updating: false,
        success: false,
        message: errorMsg,
    }));

    // *********** Selectors *********** //
    updating$ = this.select((state) => state.updating);
    success$ = this.select((state) => state.success);
    message$ = this.select((state) => state.message);

    // *********** Effects ************* //
    update = this.effect<{
        id: string;
        form: UpdateUserForm;
        success?: () => void;
    }>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setUpdate()),
            exhaustMap(({ id, form, success }) =>
                this.authService.update(id, form).pipe(
                    tapResponse({
                        next: (value) => {
                            const data = value.data;
                            this.store.dispatch(
                                AuthActions.Login({ userInfo: data })
                            );
                            this.setUpdateSuccess();
                            toast('Update Suceeded', {
                                description: 'You successfully updated',
                            });
                            if (success) {
                                success();
                            }
                        },
                        error: (error: HttpErrorResponse) => {
                            this.setUpdateError(error.error.message);
                            toast('Update Failed', {
                                description: 'An error occured while updating',
                            });
                        },
                    })
                )
            )
        );
    });

    // *********** ViewModel *********** //
    readonly vm$ = this.select(this.state$, (state) => ({
        updating: state.updating,
        success: state.success,
        message: state.message,
    }));
}
