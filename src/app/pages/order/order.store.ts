import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, tap } from 'rxjs';

// ngrx
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';

// Services
import { OrderService } from 'src/shared/services/order.service';

// Models
import { FullOrder } from '@shared/models/cart';

export interface OrderState {
    order: FullOrder | null;
    process: boolean;
    success: boolean;
    message: string;
}

@Injectable()
export class OrderStore extends ComponentStore<OrderState> {
    constructor(private orderService: OrderService) {
        super({
            order: null,
            process: false,
            success: false,
            message: '',
        });
    }
    // *********** Updaters ************ //
    setProcessOrder = this.updater((state) => ({
        ...state,
        process: true,
        success: false,
        message: '',
    }));

    setProcessOrderSuccess = this.updater((state, order: FullOrder) => ({
        ...state,
        order: order,
        process: false,
        success: true,
        message: '',
    }));

    setProcessOrderError = this.updater((state, errorMsg: string) => ({
        ...state,
        order: null,
        process: false,
        success: false,
        message: errorMsg,
    }));

    // *********** Selectors *********** //
    order$ = this.select((state) => state.order);
    process$ = this.select((state) => state.process);
    success$ = this.select((state) => state.success);
    message$ = this.select((state) => state.message);

    // *********** Effects ************* //
    getOrder = this.effect<string>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setProcessOrder()),
            exhaustMap((id) =>
                this.orderService.getOrder(id).pipe(
                    tapResponse({
                        next: (res) => {
                            const data = res.data;
                            this.setProcessOrderSuccess(data);
                        },
                        error: (error: HttpErrorResponse) => {
                            this.setProcessOrderError(error.error.message);
                        },
                    })
                )
            )
        );
    });

    // *********** ViewModel *********** //
    readonly vm$ = this.select(this.state$, (state) => ({
        order: state.order,
        process: state.process,
        success: state.success,
        message: state.message,
    }));
}
