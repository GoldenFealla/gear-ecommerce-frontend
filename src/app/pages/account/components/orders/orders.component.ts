import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
} from '@angular/core';

// Models
import { UserInfo } from '@shared/models/auth';

// Spartan
import {
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

// Component Store
import { OrdersStore } from './orders.store';

// Icons
import { provideIcons } from '@ng-icons/core';
import { bootstrapCheck, bootstrapEye } from '@ng-icons/bootstrap-icons';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { Router } from '@angular/router';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';

@Component({
    selector: 'account-orders',
    standalone: true,
    imports: [
        CommonModule,

        HlmCardDirective,
        HlmCardHeaderDirective,
        HlmCardTitleDirective,
        HlmCardContentDirective,

        HlmButtonDirective,

        HlmIconComponent,

        HlmSpinnerComponent,
    ],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss',
    providers: [OrdersStore, provideIcons({ bootstrapCheck, bootstrapEye })],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
    private readonly _ordersStore = inject(OrdersStore);
    private readonly _router = inject(Router);

    userInfo = input.required<UserInfo>();

    vm$ = this._ordersStore.vm$;

    ngOnInit() {
        this._ordersStore.getOrders({});
    }

    viewDetail(id: string) {
        this._router.navigate(['/order'], {
            queryParams: {
                id,
            },
        });
    }
}
