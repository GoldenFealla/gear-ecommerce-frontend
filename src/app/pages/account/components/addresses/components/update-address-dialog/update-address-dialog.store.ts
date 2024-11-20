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

// Models
import { UpdateAddressForm } from '@models/address';

export interface UpdateAddressDialogState {
    updating: boolean;
    success: boolean;
    message: string;
}

@Injectable()
export class UpdateAddressDialogStore extends ComponentStore<UpdateAddressDialogState> {
    constructor(private addressService: AddressService) {
        super({
            updating: false,
            success: false,
            message: '',
        });
    }
    // *********** Updaters ************ //
    setCreate = this.updater((state) => ({
        ...state,
        updating: true,
    }));

    setCreateSuccess = this.updater((state) => ({
        ...state,
        updating: false,
        success: true,
        message: '',
    }));

    setCreateError = this.updater((state, errorMsg: string) => ({
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
        form: UpdateAddressForm;
        success: () => void;
    }>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setCreate()),
            exhaustMap(({ id, form, success }) =>
                this.addressService.updateAddress(id, form).pipe(
                    tapResponse({
                        next: (value) => {
                            this.setCreateSuccess();
                            success();
                            toast('Update successfully', {
                                description: 'You successfully updated address',
                            });
                        },
                        error: (error: HttpErrorResponse) => {
                            this.setCreateError(error.error.message);
                            toast('Update Failed', {
                                description:
                                    'An error occured while updating address',
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
