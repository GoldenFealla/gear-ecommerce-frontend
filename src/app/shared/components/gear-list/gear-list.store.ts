import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, tap } from 'rxjs';

// ngrx
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';

// Services
import { GearService } from '@shared/services/gear.service';

// Models
import { Gear } from '@shared/models/gear';

export interface GearState {
    gears: Gear[] | null;
    loading: boolean;
    success: boolean;
    message: string;
}

@Injectable()
export class GearStore extends ComponentStore<GearState> {
    constructor(private gearService: GearService) {
        super({
            gears: null,
            loading: false,
            success: false,
            message: '',
        });
    }
    // *********** Updaters ************ //
    setGetList = this.updater((state) => ({
        ...state,
        gears: null,
        loading: true,
        success: false,
        message: '',
    }));

    setGetListSuccess = this.updater((state, gears: Gear[]) => ({
        ...state,
        gears: gears,
        loading: false,
        success: true,
        message: '',
    }));

    setGetListError = this.updater((state, errorMsg: string) => ({
        ...state,
        gears: null,
        loading: false,
        success: false,
        message: errorMsg,
    }));

    // *********** Selectors *********** //
    loading$ = this.select((state) => state.loading);
    success$ = this.select((state) => state.success);
    message$ = this.select((state) => state.message);

    // *********** Effects ************* //
    getList = this.effect<void>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setGetList()),
            exhaustMap(() =>
                this.gearService.getList().pipe(
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
        gears: state.gears,
        loading: state.loading,
        success: state.success,
        message: state.message,
    }));
}
