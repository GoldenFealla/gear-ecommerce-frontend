import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, tap } from 'rxjs';

// ngrx
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';

// Services
import { GearService } from '@shared/services/gear.service';

export interface GearState {
    brands: string[];
    varieties: string[];
    loading: boolean;
    success: boolean;
    message: string;
}

@Injectable()
export class CategoryStore extends ComponentStore<GearState> {
    constructor(private gearService: GearService) {
        super({
            brands: [],
            varieties: [],
            loading: false,
            success: false,
            message: '',
        });
    }
    // *********** Updaters ************ //
    setGetBrandList = this.updater((state) => ({
        ...state,
        brand: [],
        loading: true,
        success: false,
        message: '',
    }));

    setGetBrandListSuccess = this.updater((state, brands: string[]) => ({
        ...state,
        brands: brands,
        loading: false,
        success: true,
        message: '',
    }));

    setGetBrandListError = this.updater((state, errorMsg: string) => ({
        ...state,
        brands: [],
        loading: false,
        success: false,
        message: errorMsg,
    }));

    setGetVarietyList = this.updater((state) => ({
        ...state,
        varieties: [],
        loading: true,
        success: false,
        message: '',
    }));

    setGetVarietyListSuccess = this.updater((state, varieties: string[]) => ({
        ...state,
        varieties: varieties,
        loading: false,
        success: true,
        message: '',
    }));

    setGetVarietyListError = this.updater((state, errorMsg: string) => ({
        ...state,
        varieties: [],
        loading: false,
        success: false,
        message: errorMsg,
    }));

    // *********** Selectors *********** //
    loading$ = this.select((state) => state.loading);
    success$ = this.select((state) => state.success);
    message$ = this.select((state) => state.message);

    // *********** Effects ************* //
    getBrandList = this.effect<string>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setGetBrandList()),
            exhaustMap((category) =>
                this.gearService.getBrandList(category).pipe(
                    tapResponse({
                        next: (value) => {
                            const data = value.data;
                            this.setGetBrandListSuccess(data);
                        },
                        error: (error: HttpErrorResponse) => {
                            this.setGetBrandListError(error.error.message);
                        },
                    })
                )
            )
        );
    });

    getVarietyList = this.effect<string>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setGetVarietyList()),
            exhaustMap((category) =>
                this.gearService.getVarietyList(category).pipe(
                    tapResponse({
                        next: (value) => {
                            const data = value.data;
                            this.setGetVarietyListSuccess(data);
                        },
                        error: (error: HttpErrorResponse) => {
                            this.setGetVarietyListError(error.error.message);
                        },
                    })
                )
            )
        );
    });

    // *********** ViewModel *********** //
    readonly vm$ = this.select(this.state$, (state) => ({
        brands: state.brands,
        varieties: state.varieties,
        loading: state.loading,
        success: state.success,
        message: state.message,
    }));
}
