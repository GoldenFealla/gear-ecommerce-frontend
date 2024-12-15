import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
import { OrderStore } from './order.store';
import { finalize, interval, last, map, Observable, take } from 'rxjs';

@Component({
    selector: 'app-pay',
    standalone: true,
    imports: [
        CommonModule,

        HlmCardContentDirective,
        HlmCardDescriptionDirective,
        HlmCardDirective,
        HlmCardHeaderDirective,
        HlmCardTitleDirective,

        HlmSpinnerComponent,
    ],
    templateUrl: './order.component.html',
    styleUrl: './order.component.scss',
    providers: [OrderStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
    private readonly _route = inject(ActivatedRoute);
    private readonly _router = inject(Router);
    private readonly _orderStore = inject(OrderStore);

    vm$ = this._orderStore.vm$;

    number$: Observable<number> | undefined;

    ngOnInit() {
        const id = this._route.snapshot.queryParams['id'];

        if (!id) {
            this._router.navigate(['/']);
        }

        if (id) {
            this._orderStore.getOrder(id);
        }
    }

    handleOnBackHome() {
        this._router.navigate(['/']);
    }
}
