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

export type SelectType = {
    label: string;
    value: string;
};

@Component({
    selector: 'select-form-field',
    standalone: true,
    imports: [NgClass, ReactiveFormsModule, BrnSelectImports, HlmSelectImports],
    templateUrl: './select-form-field.component.html',
    styleUrl: './select-form-field.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFormFieldComponent {
    control = input.required<FormControl>();

    label = input.required<string>();
    errorLabel = input<string>();

    col = input<number>(10);
    labelSpan = input<number>(2);
    inputSpan = input<number>(8);

    list = input<SelectType[]>([]);

    @ViewChild('select') select: BrnSelectComponent | undefined;

    ngAfterViewInit() {
        if (this.select) {
            this.select.registerOnChange((value: string) => {
                this.control().setValue(value);
            });

            this.select.registerOnTouched(() => {
                this.control().markAsTouched();
            });
        }
    }
}