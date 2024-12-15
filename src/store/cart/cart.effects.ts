import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

// rxjs
import { catchError, switchMap, map, of, debounceTime } from 'rxjs';

// Service
import { OrderService } from '@shared/services/order.service';

// Store
import { CartActions } from './cart.actions';

@Injectable()
export class CartEffects {
    private readonly actions$ = inject(Actions);
    private readonly orderService = inject(OrderService);

    getCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.GetCart),
            switchMap(() =>
                this.orderService.getCart().pipe(
                    map((res) =>
                        CartActions.GetCartSuccess({ cart: res.data })
                    ),
                    catchError((error) =>
                        of(CartActions.GetCartError({ error }))
                    )
                )
            )
        )
    );

    setQuantity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.SetQuantity),
            debounceTime(300),
            switchMap(({ gear_id, quantity }) =>
                this.orderService.setQuantity(gear_id, quantity).pipe(
                    map(() => CartActions.SetQuantitySuccess()),
                    catchError((error) =>
                        of(CartActions.SetQuantityError({ error }))
                    )
                )
            )
        )
    );
}
