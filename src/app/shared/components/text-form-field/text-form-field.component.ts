import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

// Spartan
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
    selector: 'text-form-field',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HlmLabelDirective,
        HlmInputDirective,
    ],
    templateUrl: './text-form-field.component.html',
    styleUrl: './text-form-field.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFormFieldComponent {
    control = input.required<FormControl>();

    label = input.required<string>();
    errorLabel = input<string>();

    col = input<number>(10);
    labelSpan = input<number>(2);
    inputSpan = input<number>(8);
}
