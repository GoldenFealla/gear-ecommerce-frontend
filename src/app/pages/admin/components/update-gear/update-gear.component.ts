import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Spartan
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import {
    HlmAlertDescriptionDirective,
    HlmAlertDirective,
    HlmAlertIconDirective,
    HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import {
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
} from '@spartan-ng/ui-card-helm';

// Models
import {
    GearType,
    GearTypeList,
    GearTypeMapper,
    UpdateGearForm,
} from '@shared/models/gear';

// Shared Component
import { ImageCropperDialogComponent } from '@shared/components/image-cropper-dialog/image-cropper-dialog.component';
import { TextFormFieldComponent } from '@shared/components/text-form-field/text-form-field.component';
import { NumberFormFieldComponent } from '@shared/components/number-form-field/number-form-field.component';
import {
    SelectFormFieldComponent,
    SelectType,
} from '@shared/components/select-form-field/select-form-field.component';

// Component Store
import { UpdateGearStore } from './update-gear.store';
import { ImageFormFieldComponent } from '@shared/components/image-form-field/image-form-field.component';

@Component({
    selector: 'admin-update-gear',
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
    templateUrl: './update-gear.component.html',
    styleUrl: './update-gear.component.scss',
    providers: [UpdateGearStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateGearComponent {
    private readonly _route = inject(ActivatedRoute);
    private readonly _router = inject(Router);
    private readonly _updateGearStore = inject(UpdateGearStore);

    vm$ = this._updateGearStore.vm$;

    idFieldControl = new FormControl('');

    updateGearForm = new FormGroup({
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
    originalImage: string | null = null;

    ngOnInit() {
        const id = this._route.snapshot.queryParams['id'];

        if (id) {
            this.idFieldControl.setValue(id);
            this._updateGearStore.getGear({ id });
        }

        this.gearTypeList = GearTypeList.map((e) => ({ label: e, value: e }));
        this.updateGearForm.disable();

        this.vm$.subscribe((vm) => {
            const gear = vm.check.gear;
            if (gear) {
                this.originalImage = gear.image_url;

                this.updateGearForm.patchValue({
                    image: gear.image_url,
                    name: gear.name,
                    type: GearTypeMapper[gear.type],
                    brand: gear.brand,
                    variety: gear.variety,
                    price: gear.price.toString(),
                    discount: gear.discount.toString(),
                    quantity: gear.quantity.toString(),
                });

                this.updateGearForm.enable();
                this.updateGearForm.markAsPristine();
            }
        });
    }

    handleOnUpdate() {
        const value = this.updateGearForm.getRawValue();

        if (value) {
            let image_base64: string | undefined = undefined;

            if (this.originalImage && this.originalImage !== value.image) {
                image_base64 = value.image!.split(',')[1];
                console.log('true');
            }

            const form: UpdateGearForm = {
                name: value.name!,
                type: value.type! as unknown as GearType,
                brand: value.brand!,
                variety: value.variety!,
                price: parseFloat(value.price!),
                discount: parseFloat(value.discount!),
                quantity: parseInt(value.quantity!),
            };

            if (image_base64) {
                form['image_base64'] = image_base64;
            }

            console.log(form);

            const id = this.idFieldControl.value!;

            this._updateGearStore.update({ id, form });
        }
    }

    handleOnCheck() {
        if (this.idFieldControl.valid) {
            const value = this.idFieldControl.value;
            this._updateGearStore.getGear({ id: value! });
            this._router.navigate([], {
                queryParams: {
                    id: value,
                },
                queryParamsHandling: 'merge',
            });
        }
    }
}
