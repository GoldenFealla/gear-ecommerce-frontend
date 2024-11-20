import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, tap } from 'rxjs';

// Toast
import { toast } from 'ngx-sonner';

// ngrx
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';

// Services
import { AddressService } from '@shared/services/address.service';

export interface DeleteAddressDialogState {
    deleting: boolean;
    success: boolean;
    message: string;
}

@Injectable()
export class DeleteAddressDialogStore extends ComponentStore<DeleteAddressDialogState> {
    constructor(private addressService: AddressService) {
        super({
            deleting: false,
            success: false,
            message: '',
        });
    }
    // *********** Updaters ************ //
    setDelete = this.updater((state) => ({
        ...state,
        deleting: true,
    }));

    setDeleteSuccess = this.updater((state) => ({
        ...state,
        deleting: false,
        success: true,
        message: '',
    }));

    setDeleteError = this.updater((state, errorMsg: string) => ({
        ...state,
        deleting: false,
        success: false,
        message: errorMsg,
    }));

    // *********** Selectors *********** //
    deleting$ = this.select((state) => state.deleting);
    success$ = this.select((state) => state.success);
    message$ = this.select((state) => state.message);

    // *********** Effects ************* //
    create = this.effect<{ id: string; success: () => void }>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setDelete()),
            exhaustMap(({ id, success }) =>
                this.addressService.deleletAddress(id).pipe(
                    tapResponse({
                        next: (value) => {
                            this.setDeleteSuccess();
                            success();
                            toast('Delele successfully', {
                                duration: 5000,
                                description: 'You successfully deleted address',
                            });
                        },
                        error: (error: HttpErrorResponse) => {
                            this.setDeleteError(error.error.message);
                            toast('Delele Failed', {
                                duration: 5000,
                                description:
                                    'An error occured while deleting address',
                            });
                        },
                    })
                )
            )
        );
    });

    // *********** ViewModel *********** //
    readonly vm$ = this.select(this.state$, (state) => ({
        deleting: state.deleting,
        success: state.success,
        message: state.message,
    }));
}
