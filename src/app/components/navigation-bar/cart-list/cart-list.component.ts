import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    input,
    Output,
} from '@angular/core';

// Spartan
import { BrnPopoverContentDirective } from '@spartan-ng/ui-popover-brain';
import { HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

// Model
import { OrderGear } from '@shared/models/cart';

@Component({
    selector: 'cart-list',
    standalone: true,
    imports: [
        BrnPopoverContentDirective,
        HlmPopoverContentDirective,
        HlmButtonDirective,
    ],
    templateUrl: './cart-list.component.html',
    styleUrl: './cart-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartListComponent {
    @Output() onPay = new EventEmitter<void>();

    orderGears = input.required<OrderGear[]>();

    pay() {
        this.onPay.emit();
    }
}
