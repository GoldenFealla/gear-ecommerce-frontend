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
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';

@Component({
    selector: 'gear-card',
    standalone: true,
    imports: [CommonModule, HlmCardContentDirective, HlmCardDirective],
    templateUrl: './gear-card.component.html',
    styleUrl: './gear-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GearCardComponent implements OnInit {
    gear = input.required<Gear>();

    ngOnInit(): void {}
}
