import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, tap } from 'rxjs';

// Toast
import { toast } from 'ngx-sonner';

// ngrx
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';

// Services
import { GearService } from '@shared/services/gear.service';

// Models
import { Gear, UpdateGearForm } from '@shared/models/gear';

export interface CheckGearState {
    gear: Gear | null;
    loading: boolean;
    success: boolean;
    message: string;
}

export interface UpdateGearState {
    updating: boolean;
    success: boolean;
    message: string;
}

export interface UpdateGearStoreState {
    check: CheckGearState;
    update: UpdateGearState;
}

@Injectable()
export class UpdateGearStore extends ComponentStore<UpdateGearStoreState> {
    constructor(private gearService: GearService) {
        super({
            check: {
                gear: null,
                loading: false,
                success: false,
                message: '',
            },
            update: {
                updating: false,
                success: false,
                message: '',
            },
        });
    }
    // *********** Updaters ************ //
    setUpdate = this.updater((state) => ({
        ...state,
        update: { ...state.update, updating: true },
    }));

    setUpdateSuccess = this.updater((state) => ({
        ...state,
        update: { updating: false, success: true, message: '' },
    }));

    setUpdateError = this.updater((state, errorMsg: string) => ({
        ...state,
        update: { updating: false, success: false, message: errorMsg },
    }));

    setGetGear = this.updater((state) => ({
        ...state,
        check: { ...state.check, loading: true },
    }));

    setGetGearSuccess = this.updater((state, gear: Gear | null) => ({
        ...state,
        check: {
            gear: gear,
            loading: false,
            success: true,
            message: '',
        },
    }));

    setGetGearError = this.updater((state, errorMsg: string) => ({
        ...state,
        check: {
            gear: null,
            loading: false,
            success: false,
            message: errorMsg,
        },
    }));

    // *********** Selectors *********** //

    // *********** Effects ************* //
    update = this.effect<{
        id: string;
        form: UpdateGearForm;
        success?: () => void;
    }>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setUpdate()),
            exhaustMap(({ id, form, success }) =>
                this.gearService.updateGear(id, form).pipe(
                    tapResponse({
                        next: () => {
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

    getGear = this.effect<{
        id: string;
        success?: () => void;
    }>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setGetGear()),
            exhaustMap(({ id, success }) =>
                this.gearService.getGearID(id).pipe(
                    tapResponse({
                        next: (value) => {
                            const data = value.data;
                            this.setGetGearSuccess(data);
                            toast('Check gear Suceeded', {
                                description: 'Successfully check',
                            });
                            if (success) {
                                success();
                            }
                        },
                        error: (error: HttpErrorResponse) => {
                            this.setGetGearError(error.error.message);
                            toast('Check gear Failed', {
                                description: 'Invalid uuid',
                            });
                        },
                    })
                )
            )
        );
    });

    // *********** ViewModel *********** //
    readonly vm$ = this.select(this.state$, (state) => ({
        check: state.check,
        update: state.update,
    }));
}
