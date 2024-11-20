import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, tap } from 'rxjs';

// ngrx
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';

// Services
import { AddressService } from '@shared/services/address.service';

// Models
import { Address } from '@shared/models/address';

export interface AddressState {
    addresses: Address[] | null;
    loading: boolean;
    success: boolean;
    message: string;
}

@Injectable()
export class AddressStore extends ComponentStore<AddressState> {
    constructor(private addressService: AddressService) {
        super({
            addresses: null,
            loading: false,
            success: false,
            message: '',
        });
    }
    // *********** Updaters ************ //
    setGetList = this.updater((state) => ({
        ...state,
        addresses: null,
        loading: true,
        success: false,
        message: '',
    }));

    setGetListSuccess = this.updater((state, addresses: Address[]) => ({
        ...state,
        addresses: addresses,
        loading: false,
        success: true,
        message: '',
    }));

    setGetListError = this.updater((state, errorMsg: string) => ({
        ...state,
        addresses: null,
        loading: false,
        success: false,
        message: errorMsg,
    }));

    // *********** Selectors *********** //
    loading$ = this.select((state) => state.loading);
    success$ = this.select((state) => state.success);
    message$ = this.select((state) => state.message);

    // *********** Effects ************* //
    getList = this.effect<string>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setGetList()),
            exhaustMap((user_id) =>
                this.addressService.getList(user_id).pipe(
                    tapResponse({
                        next: (value) => {
                            const data = value.data;
                            this.setGetListSuccess(data);
                        },
                        error: (error: HttpErrorResponse) => {
                            this.setGetListError(error.error.message);
                        },
                    })
                )
            )
        );
    });

    // *********** ViewModel *********** //
    readonly vm$ = this.select(this.state$, (state) => ({
        addresses: state.addresses,
        loading: state.loading,
        success: state.success,
        message: state.message,
    }));
}
