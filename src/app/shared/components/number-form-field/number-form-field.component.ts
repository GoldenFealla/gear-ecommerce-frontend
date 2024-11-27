import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    input,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

// Spartan
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
    selector: 'number-form-field',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HlmLabelDirective,
        HlmInputDirective,
    ],
    templateUrl: './number-form-field.component.html',
    styleUrl: './number-form-field.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberFormFieldComponent {
    control = input.required<FormControl>();

    numberPattern = /^[-]{0,1}[0-9]*$/;

    constructor() {
        effect(() => {
            this.control().addValidators(
                Validators.pattern(this.numberPattern)
            );
        });
    }

    label = input.required<string>();
    errorLabel = input<string>();

    col = input<number>(10);
    labelSpan = input<number>(2);
    inputSpan = input<number>(8);
}
