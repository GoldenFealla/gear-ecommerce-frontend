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
import { toast } from 'ngx-sonner';

// Models
import { Order } from '@shared/models/cart';

export interface OrdersState {
    orders: Order[] | null;
    process: boolean;
    success: boolean;
    message: string;
}

@Injectable()
export class OrdersStore extends ComponentStore<OrdersState> {
    constructor(private orderService: OrderService) {
        super({
            orders: null,
            process: false,
            success: false,
            message: '',
        });
    }
    // *********** Updaters ************ //
    setGetOrders = this.updater((state) => ({
        ...state,
        process: true,
        success: false,
        message: '',
    }));

    setGetOrdersSuccess = this.updater((state, orders: Order[]) => ({
        ...state,
        orders: orders,
        process: false,
        success: true,
        message: '',
    }));

    setGetOrdersError = this.updater((state, errorMsg: string) => ({
        ...state,
        orders: null,
        process: false,
        success: false,
        message: errorMsg,
    }));

    // *********** Selectors *********** //
    orders$ = this.select((state) => state.orders);
    process$ = this.select((state) => state.process);
    success$ = this.select((state) => state.success);
    message$ = this.select((state) => state.message);

    // *********** Effects ************* //
    getOrders = this.effect<{ page?: number; limit?: number }>((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setGetOrders()),
            exhaustMap(({ page, limit }) =>
                this.orderService.getOrderList(page, limit).pipe(
                    tapResponse({
                        next: (res) => {
                            const data = res.data;
                            this.setGetOrdersSuccess(data);
                        },
                        error: (error: HttpErrorResponse) => {
                            this.setGetOrdersError(error.error.message);
                        },
                    })
                )
            )
        );
    });

    // *********** ViewModel *********** //
    readonly vm$ = this.select(this.state$, (state) => ({
        orders: state.orders,
        process: state.process,
        success: state.success,
        message: state.message,
    }));
}
