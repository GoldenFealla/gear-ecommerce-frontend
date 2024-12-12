import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
    type OnInit,
} from '@angular/core';

// Model
import { Gear } from 'src/shared/models/gear';
import { OrderGear } from '@shared/models/cart';

// Spartan
import {
    HlmCardContentDirective,
    HlmCardDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import {
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
} from '@spartan-ng/ui-tooltip-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';

// Icons
import { provideIcons } from '@ng-icons/core';
import {
    bootstrapCartPlus,
    bootstrapCartCheck,
    bootstrapCartDash,
    bootstrapCopy,
} from '@ng-icons/bootstrap-icons';

// Toast
import { toast } from 'ngx-sonner';
import { DiscountPercentPipe } from './discount-percent.pipe';

// Component Store
import { GearCardStore } from './gear-card.store';

@Component({
    selector: 'gear-card',
    standalone: true,
    imports: [
        CommonModule,

        DiscountPercentPipe,

        HlmCardContentDirective,
        HlmCardDirective,

        HlmButtonDirective,

        HlmIconComponent,

        BrnTooltipContentDirective,
        HlmTooltipComponent,
        HlmTooltipTriggerDirective,

        HlmSpinnerComponent,
    ],
    templateUrl: './gear-card.component.html',
    styleUrl: './gear-card.component.scss',
    providers: [
        GearCardStore,
        provideIcons({
            bootstrapCartPlus,
            bootstrapCartCheck,
            bootstrapCartDash,
            bootstrapCopy,
        }),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GearCardComponent implements OnInit {
    private readonly _gearCartStore = inject(GearCardStore);

    gear = input.required<Gear>();
    orderGears = input<OrderGear[]>([]);
    vm$ = this._gearCartStore.vm$;

    isAdded = computed(() => {
        if (!this.orderGears()) return;

        return this.orderGears().some((orderGear) => {
            return orderGear.gear.id === this.gear().id;
        });
    });

    ngOnInit(): void {}

    handleOnCopyGearID(id: string) {
        navigator.clipboard.writeText(id);
        toast('✓ Copied Gear ID');
    }

    handleOnAddToCart(id: string) {
        this._gearCartStore.addToCart(id);
    }

    handleOnRemoveFromCart(id: string) {
        this._gearCartStore.removeFromCart(id);
    }
}
