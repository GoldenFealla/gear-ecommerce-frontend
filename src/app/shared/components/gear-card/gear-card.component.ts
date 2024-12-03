import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    input,
    type OnInit,
} from '@angular/core';

// Model
import { Gear } from '@shared/models/gear';

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

// Icons
import { provideIcons } from '@ng-icons/core';
import { bootstrapCartPlus, bootstrapCopy } from '@ng-icons/bootstrap-icons';

// Toast
import { toast } from 'ngx-sonner';
import { DiscountPercentPipe } from './discount-percent.pipe';

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
    ],
    templateUrl: './gear-card.component.html',
    styleUrl: './gear-card.component.scss',
    providers: [provideIcons({ bootstrapCartPlus, bootstrapCopy })],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GearCardComponent implements OnInit {
    gear = input.required<Gear>();

    ngOnInit(): void {}

    handleOnCopyGearID(id: string) {
        navigator.clipboard.writeText(id);
        toast('✓ Copied Gear ID');
    }
}
