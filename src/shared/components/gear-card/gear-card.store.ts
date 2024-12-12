import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, tap } from 'rxjs';

// ngrx
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';

// Services
import { OrderService } from 'src/shared/services/order.service';

// Store
import { Store } from '@ngrx/store';
import { CartActions } from '@store/cart/cart.actions';

export interface GearCardState {
    process: boolean;
    success: boolean;
    message: string;
}

@Injectable()
export class GearCardStore extends ComponentStore<GearCardState> {
    constructor(private orderService: OrderService, private store: Store) {
        super({
            process: false,
            success: false,
            message: '',
        });
    }
    // *********** Updaters ************ //
    setProcessCart = this.updater((state) => ({
        ...state,
        process: true,
        success: false,
        message: '',
    }));

    setProcessCartSuccess = this.updater((state) => ({
        ...state,
        process: false,
        success: true,
        message: '',
    }));

    setProcessCartError = this.updater((state, errorMsg: string) => ({
        ...state,
        process: false,
        success: false,
        message: errorMsg,
    }));

    // *********** Selectors *********** //
    process$ = this.select((state) => state.process);
    success$ = this.select((state) => state.success);
    message$ = this.select((state) => state.message);

    // *********** Effects ************* //
    addToCart = this.effect<string>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setProcessCart()),
            exhaustMap((id) =>
                this.orderService.addToCart(id).pipe(
                    tapResponse({
                        next: () => {
                            this.setProcessCartSuccess();
                            this.store.dispatch(CartActions.GetCart());
                        },
                        error: (error: HttpErrorResponse) => {
                            this.setProcessCartError(error.error.message);
                        },
                    })
                )
            )
        );
    });

    removeFromCart = this.effect<string>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setProcessCart()),
            exhaustMap((id) =>
                this.orderService.removeFromCart(id).pipe(
                    tapResponse({
                        next: () => {
                            this.setProcessCartSuccess();
                            this.store.dispatch(CartActions.GetCart());
                        },
                        error: (error: HttpErrorResponse) => {
                            this.setProcessCartError(error.error.message);
                        },
                    })
                )
            )
        );
    });

    // *********** ViewModel *********** //
    readonly vm$ = this.select(this.state$, (state) => ({
        process: state.process,
        success: state.success,
        message: state.message,
    }));
}
