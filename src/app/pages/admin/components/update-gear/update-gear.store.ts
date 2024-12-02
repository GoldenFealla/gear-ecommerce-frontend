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
import { UpdateGearForm } from '@shared/models/gear';

export interface UpdateGearState {
    updating: boolean;
    success: boolean;
    message: string;
}

@Injectable()
export class UpdateGearStore extends ComponentStore<UpdateGearState> {
    constructor(private gearService: GearService) {
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
        form: UpdateGearForm;
        success?: () => void;
    }>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setUpdate()),
            exhaustMap(({ form, success }) =>
                this.gearService.updateGear(form).pipe(
                    tapResponse({
                        next: (value) => {
                            this.setUpdateSuccess();
                            toast('Add Suceeded', {
                                description: 'You successfully added',
                            });
                            if (success) {
                                success();
                            }
                        },
                        error: (error: HttpErrorResponse) => {
                            this.setUpdateError(error.error.message);
                            toast('Add Failed', {
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
