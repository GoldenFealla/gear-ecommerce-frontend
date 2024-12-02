import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

// Spartan
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import {
    HlmAlertDescriptionDirective,
    HlmAlertDirective,
    HlmAlertIconDirective,
    HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import {
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';

// Component Store
import { AddGearStore } from './add-gear.store';

// Models
import { AddGearForm, GearType, GearTypeList } from '@shared/models/gear';

// Shared Component
import { ImageCropperDialogComponent } from '@shared/components/image-cropper-dialog/image-cropper-dialog.component';
import { TextFormFieldComponent } from '@shared/components/text-form-field/text-form-field.component';
import { NumberFormFieldComponent } from '@shared/components/number-form-field/number-form-field.component';
import {
    SelectFormFieldComponent,
    SelectType,
} from '@shared/components/select-form-field/select-form-field.component';
import { ImageFormFieldComponent } from '@shared/components/image-form-field/image-form-field.component';

@Component({
    selector: 'admin-add-gear',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,

        HlmSpinnerComponent,

        HlmAlertDescriptionDirective,
        HlmAlertDirective,
        HlmAlertIconDirective,
        HlmAlertTitleDirective,

        HlmCardDirective,
        HlmCardHeaderDirective,
        HlmCardTitleDirective,
        HlmCardContentDirective,

        HlmButtonDirective,
        HlmIconComponent,

        ImageFormFieldComponent,
        TextFormFieldComponent,
        NumberFormFieldComponent,
        SelectFormFieldComponent,
    ],
    templateUrl: './add-gear.component.html',
    styleUrl: './add-gear.component.scss',
    providers: [AddGearStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGearComponent {
    private readonly _addGearStore = inject(AddGearStore);

    vm$ = this._addGearStore.vm$;

    addGearForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        brand: new FormControl('', [Validators.required]),
        variety: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        discount: new FormControl('', [Validators.required]),
        quantity: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required]),
    });

    gearTypeList: SelectType[] = [];

    ngOnInit() {
        this.gearTypeList = GearTypeList.map((e) => ({ label: e, value: e }));
    }

    handleOnAdd() {
        const value = this.addGearForm.getRawValue();

        if (value) {
            const form: AddGearForm = {
                image_base64: value.image!.split(',')[1],
                name: value.name!,
                type: value.type! as GearType,
                brand: value.brand!,
                variety: value.variety!,
                price: parseFloat(value.price!),
                discount: parseFloat(value.discount!),
                quantity: parseInt(value.quantity!),
            };

            this._addGearStore.add({ form });
        }
    }
}
