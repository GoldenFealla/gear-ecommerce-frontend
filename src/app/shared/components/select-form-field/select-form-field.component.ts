import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    input,
    ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

// Spartan
import {
    BrnSelectComponent,
    BrnSelectImports,
} from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';

// Tailwind Variables
import { listOfCol, listOfSpan } from '@shared/models/tailwind_variables';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

export type SelectType = {
    label: string;
    value: string;
};

@Component({
    selector: 'select-form-field',
    standalone: true,
    imports: [
        NgClass,
        ReactiveFormsModule,

        BrnSelectImports,
        HlmSelectImports,

        HlmLabelDirective,
    ],
    templateUrl: './select-form-field.component.html',
    styleUrl: './select-form-field.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFormFieldComponent {
    control = input.required<FormControl>();

    label = input.required<string>();
    placeholder = input.required<string>();
    errorLabel = input<string>();

    col = input<number>(10);
    labelSpan = input<number>(2);
    inputSpan = input<number>(8);

    cols = listOfCol;
    spans = listOfSpan;

    list = input<SelectType[]>([]);

    @ViewChild('select') select: BrnSelectComponent | undefined;

    ngAfterViewInit() {
        const select = this.select;
        if (select) {
            select.disabled = this.control().disabled;

            this.control().registerOnChange(() => {
                select.writeValue(this.control().value);
            });

            select.registerOnChange((value: string) => {
                this.control().setValue(value);
                this.control().markAsTouched();
                this.control().markAsDirty();
            });

            select.registerOnTouched(() => {
                this.control().markAsTouched();
                this.control().markAsDirty();
            });

            this.control().registerOnDisabledChange((isDisabled: boolean) => {
                select.disabled = isDisabled;
            });
        }
    }
}
