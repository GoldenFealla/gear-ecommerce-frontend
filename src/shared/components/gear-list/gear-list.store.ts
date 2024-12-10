import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, tap } from 'rxjs';

// ngrx
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';

// Services
import { GearService } from 'src/shared/services/gear.service';

// Models
import { Gear, ListGearFilter } from 'src/shared/models/gear';

export interface GearState {
    total: number;
    gears: Gear[] | null;
    loading: boolean;
    success: boolean;
    message: string;
}

@Injectable()
export class GearStore extends ComponentStore<GearState> {
    constructor(private gearService: GearService) {
        super({
            total: 0,
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

    setGetListCount = this.updater((state) => ({
        ...state,
        total: 0,
        loading: true,
        success: false,
        message: '',
    }));

    setGetListCountSuccess = this.updater((state, count: number) => ({
        ...state,
        total: count,
        loading: false,
        success: true,
        message: '',
    }));

    setGetListCountError = this.updater((state, errorMsg: string) => ({
        ...state,
        total: 0,
        loading: false,
        success: false,
        message: errorMsg,
    }));

    // *********** Selectors *********** //
    loading$ = this.select((state) => state.loading);
    success$ = this.select((state) => state.success);
    message$ = this.select((state) => state.message);

    // *********** Effects ************* //
    getList = this.effect<ListGearFilter>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setGetList()),
            exhaustMap((filter) =>
                this.gearService.getList(filter).pipe(
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

    getListCount = this.effect<ListGearFilter>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setGetListCount()),
            exhaustMap((filter) =>
                this.gearService.getListCount(filter).pipe(
                    tapResponse({
                        next: (value) => {
                            const data = value.data;
                            this.setGetListCountSuccess(data);
                        },
                        error: (error: HttpErrorResponse) => {
                            this.setGetListCountError(error.error.message);
                        },
                    })
                )
            )
        );
    });

    // *********** ViewModel *********** //
    readonly vm$ = this.select(this.state$, (state) => ({
        total: state.total,
        gears: state.gears,
        loading: state.loading,
        success: state.success,
        message: state.message,
    }));
}
