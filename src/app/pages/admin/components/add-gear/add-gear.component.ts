import {
    ChangeDetectionStrategy,
    Component,
    inject,
    ViewChild,
} from '@angular/core';
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
import {
    BrnSelectComponent,
    BrnSelectImports,
} from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';

// Component Store
import { AddGearStore } from './add-gear.store';

// Models
import { AddGearForm, GearType, GearTypeList } from '@shared/models/gear';

// Shared Component
import { ImageCropperDialogComponent } from '@shared/components/image-cropper-dialog/image-cropper-dialog.component';
import { TextFormFieldComponent } from '@shared/components/text-form-field/text-form-field.component';
import { NumberFormFieldComponent } from '@shared/components/number-form-field/number-form-field.component';

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

        HlmLabelDirective,
        HlmInputDirective,

        BrnSelectComponent,
        BrnSelectImports,
        HlmSelectImports,

        TextFormFieldComponent,
        NumberFormFieldComponent,
    ],
    templateUrl: './add-gear.component.html',
    styleUrl: './add-gear.component.scss',
    providers: [AddGearStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGearComponent {
    private readonly _hlmDialogService = inject(HlmDialogService);
    private readonly _addGearStore = inject(AddGearStore);

    vm$ = this._addGearStore.vm$;

    numberPattern = /^[0-9]+$/;
    addGearForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        brand: new FormControl('', [Validators.required]),
        price: new FormControl(0, [Validators.required]),
        discount: new FormControl(0, [Validators.required]),
        quantity: new FormControl(0, [Validators.required]),
        image: new FormControl('', [Validators.required]),
    });

    gearTypeList: string[] = [];

    ngOnInit() {
        this.gearTypeList = [...GearTypeList];
    }

    @ViewChild('gearTypeSelect') gearTypeSelect: BrnSelectComponent | undefined;

    ngAfterViewInit() {
        if (this.gearTypeSelect) {
            this.gearTypeSelect.registerOnChange((type: string) => {
                this.addGearForm.patchValue({
                    type,
                });
            });

            this.gearTypeSelect.registerOnTouched(() => {
                this.addGearForm.controls.type.markAsTouched();
            });
        }
    }

    imageReview: string | null = null;
    handleOnImageFileChange(event: HTMLInputElement) {
        const files = event.files;
        const file = files ? files[0] : null;

        if (file) {
            const imageCropperRef = this._hlmDialogService.open(
                ImageCropperDialogComponent,
                {
                    contentClass: 'sm:!max-w-[750px] min-w-[350px]',
                    context: {
                        file,
                    },
                }
            );

            imageCropperRef.closed$.subscribe((result: string | null) => {
                if (result) {
                    this.addGearForm.patchValue({
                        image: result,
                    });
                    this.imageReview = result;
                }

                this.addGearForm.controls.image.markAsTouched();
            });
        }
    }

    handleOnAdd() {
        const value = this.addGearForm.getRawValue();

        if (value) {
            const form: AddGearForm = {
                image_base64: value.image!.split(',')[1],
                name: value.name!,
                type: value.type! as unknown as GearType,
                brand: value.brand!,
                price: value.price!,
                discount: value.discount!,
                quantity: value.quantity!,
            };

            this._addGearStore.add({ form });
        }
    }
}
