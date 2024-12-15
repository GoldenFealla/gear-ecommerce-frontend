import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// ngrx
import { Store } from '@ngrx/store';

// Store
import { CartState } from '@store/cart/cart.state';
import { CartActions } from '@store/cart/cart.actions';

// Spartan
import {
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';

// pipe
import { TotalPricePipe } from '@shared/pipe/total-price.pipe';

// Models
import { OrderGear } from '@shared/models/cart';

// Component Store
import { PayStore } from './pay.store';
import { finalize, interval, last, map, Observable, take } from 'rxjs';

@Component({
    selector: 'app-pay',
    standalone: true,
    imports: [
        CommonModule,
        TotalPricePipe,

        HlmCardContentDirective,
        HlmCardDescriptionDirective,
        HlmCardDirective,
        HlmCardFooterDirective,
        HlmCardHeaderDirective,
        HlmCardTitleDirective,

        HlmButtonDirective,

        HlmSpinnerComponent,
    ],
    templateUrl: './pay.component.html',
    styleUrl: './pay.component.scss',
    providers: [PayStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayComponent {
    private readonly _route = inject(ActivatedRoute);
    private readonly _router = inject(Router);
    private readonly _payStore = inject(PayStore);
    private readonly _store = inject<Store<{ cart: CartState }>>(
        Store<{ cart: CartState }>
    );

    fullOrder$ = this._store.select((state) => state.cart.cart);
    processing$ = this._store.select((state) => state.cart.processing);
    vm$ = this._payStore.vm$;

    number$: Observable<number> | undefined;

    ngOnInit() {
        const id = this._route.snapshot.queryParams['id'];

        if (!id) {
            this._router.navigate(['/']);
        }

        if (id) {
            this._store.dispatch(CartActions.GetCart());
        }

        this.fullOrder$.subscribe((f) => {
            if (!f || !f.order_gear || f.order_gear.length === 0) {
                this.number$ = interval(1000).pipe(
                    take(6),
                    map((v) => 5 - v),
                    finalize(() => {
                        this._router.navigate(['/']);
                    })
                );
            }
        });
    }

    handleOnIncreaseQuantity(gear: OrderGear) {
        if (gear.quantity === gear.gear.quantity) {
            return;
        }
        this._store.dispatch(
            CartActions.SetQuantity({
                gear_id: gear.gear.id,
                quantity: gear.quantity + 1,
            })
        );
    }

    handleOnDecreaseQuantity(gear: OrderGear) {
        if (gear.quantity === 1) {
            return;
        }
        this._store.dispatch(
            CartActions.SetQuantity({
                gear_id: gear.gear.id,
                quantity: gear.quantity - 1,
            })
        );
    }

    handleOnPay(id: string) {
        this._payStore.payToCart({
            id,
            success: () => {
                this._router.navigate(['/']);
            },
        });
    }

    handleOnBackHome() {
        this._router.navigate(['/']);
    }
}
