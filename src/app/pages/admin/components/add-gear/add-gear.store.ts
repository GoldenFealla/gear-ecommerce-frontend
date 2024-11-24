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
import { AddGearForm } from '@shared/models/gear';

export interface AddGearState {
    creating: boolean;
    success: boolean;
    message: string;
}

@Injectable()
export class AddGearStore extends ComponentStore<AddGearState> {
    constructor(private gearService: GearService) {
        super({
            creating: false,
            success: false,
            message: '',
        });
    }
    // *********** Updaters ************ //
    setAdd = this.updater((state) => ({
        ...state,
        creating: true,
    }));

    setAddSuccess = this.updater((state) => ({
        ...state,
        creating: false,
        success: true,
        message: '',
    }));

    setAddError = this.updater((state, errorMsg: string) => ({
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
    add = this.effect<{
        form: AddGearForm;
        success?: () => void;
    }>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setAdd()),
            exhaustMap(({ form, success }) =>
                this.gearService.createGear(form).pipe(
                    tapResponse({
                        next: (value) => {
                            this.setAddSuccess();
                            toast('Add Suceeded', {
                                description: 'You successfully added',
                            });
                            if (success) {
                                success();
                            }
                        },
                        error: (error: HttpErrorResponse) => {
                            this.setAddError(error.error.message);
                            toast('Add Failed', {
                                description: 'An error occured while creating',
                            });
                        },
                    })
                )
            )
        );
    });

    // *********** ViewModel *********** //
    readonly vm$ = this.select(this.state$, (state) => ({
        creating: state.creating,
        success: state.success,
        message: state.message,
    }));
}
