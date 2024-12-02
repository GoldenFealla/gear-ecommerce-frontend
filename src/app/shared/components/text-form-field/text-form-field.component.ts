import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    input,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

// Spartan
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

// Tailwind Variables
import { listOfCol, listOfSpan } from '@shared/models/tailwind_variables';

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
    private readonly _changeDetectorRef = inject(ChangeDetectorRef);

    control = input.required<FormControl>();

    label = input.required<string>();
    errorLabel = input<string>();

    col = input<string>('10');
    labelSpan = input<string>('2');
    inputSpan = input<string>('8');

    cols = listOfCol;
    spans = listOfSpan;

    ngOnInit() {
        this._changeDetectorRef.detectChanges();
    }
}
