import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, tap } from 'rxjs';

// Toast
import { toast } from 'ngx-sonner';

// ngrx
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';

// Services
import { AddressService } from 'src/shared/services/address.service';

// Models
import { AddAddressForm } from 'src/shared/models/address';

export interface AddAddressDialogState {
    creating: boolean;
    success: boolean;
    message: string;
}

@Injectable()
export class AddAddressDialogStore extends ComponentStore<AddAddressDialogState> {
    constructor(private addressService: AddressService) {
        super({
            creating: false,
            success: false,
            message: '',
        });
    }
    // *********** Updaters ************ //
    setCreate = this.updater((state) => ({
        ...state,
        creating: true,
    }));

    setCreateSuccess = this.updater((state) => ({
        ...state,
        creating: false,
        success: true,
        message: '',
    }));

    setCreateError = this.updater((state, errorMsg: string) => ({
        ...state,
        creating: false,
        success: false,
        message: errorMsg,
    }));

    // *********** Selectors *********** //
    creating$ = this.select((state) => state.creating);
    success$ = this.select((state) => state.success);
    message$ = this.select((state) => state.message);

    // *********** Effects ************* //
    create = this.effect<{ form: AddAddressForm; success: () => void }>(
        (trigger$) => {
            return trigger$.pipe(
                tap(() => this.setCreate()),
                exhaustMap(({ form, success }) =>
                    this.addressService.addAddress(form).pipe(
                        tapResponse({
                            next: (value) => {
                                this.setCreateSuccess();
                                success();
                                toast('Add successfully', {
                                    description:
                                        'You successfully added address',
                                });
                            },
                            error: (error: HttpErrorResponse) => {
                                this.setCreateError(error.error.message);
                                toast('Add Failed', {
                                    description:
                                        'An error occured while adding address',
                                });
                            },
                        })
                    )
                )
            );
        }
    );

    // *********** ViewModel *********** //
    readonly vm$ = this.select(this.state$, (state) => ({
        creating: state.creating,
        success: state.success,
        message: state.message,
    }));
}
