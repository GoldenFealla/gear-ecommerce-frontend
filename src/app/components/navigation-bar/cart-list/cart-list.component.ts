import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    inject,
    input,
    Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// Spartan
import { BrnPopoverContentDirective } from '@spartan-ng/ui-popover-brain';
import { HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

// Model
import { OrderGear } from '@shared/models/cart';

// Component Store
import { CartListStore } from './cart-list.store';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';

@Component({
    selector: 'cart-list',
    standalone: true,
    imports: [
        CommonModule,
        BrnPopoverContentDirective,
        HlmPopoverContentDirective,
        HlmButtonDirective,
        HlmSpinnerComponent,
    ],
    templateUrl: './cart-list.component.html',
    styleUrl: './cart-list.component.scss',
    providers: [CartListStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartListComponent {
    private readonly _cartListStore = inject(CartListStore);

    @Output() onPay = new EventEmitter<void>();

    orderGears = input.required<OrderGear[]>();
    vm$ = this._cartListStore.vm$;
    process_id: string = '';

    pay() {
        this.onPay.emit();
    }

    handleOnDelete(id: string) {
        this.process_id = id;
        this._cartListStore.removeFromCart({ id });
    }
}
