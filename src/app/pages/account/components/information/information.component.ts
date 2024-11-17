import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    input,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

// Models
import { UpdateUserForm, UserInfo } from '@shared/models/auth';

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

// Icon
import { provideIcons } from '@ng-icons/core';
import { bootstrapCopy, bootstrapPencilFill } from '@ng-icons/bootstrap-icons';

// toast
import { toast } from 'ngx-sonner';

// Store
import { InformationStore } from './information.store';

@Component({
    selector: 'account-information',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,

        HlmSpinnerComponent,

        HlmAlertDescriptionDirective,
        HlmAlertDirective,
        HlmAlertIconDirective,
        HlmAlertTitleDirective,

        HlmButtonDirective,
        HlmIconComponent,

        HlmLabelDirective,
        HlmInputDirective,
    ],
    templateUrl: './information.component.html',
    styleUrl: './information.component.scss',
    providers: [
        provideIcons({ bootstrapCopy, bootstrapPencilFill }),
        InformationStore,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
    private readonly _informationStore = inject(InformationStore);

    constructor() {
        effect(() => {
            this.userInfoForm.patchValue({
                id: this.userInfo()?.id,
                username: this.userInfo()?.username,
                email: this.userInfo()?.email,
                first_name: this.userInfo()?.first_name,
                last_name: this.userInfo()?.last_name,
                phone: this.userInfo()?.phone,
            });
        });
    }

    readonly vm$ = this._informationStore.vm$;
    userInfo = input<UserInfo | null>(null);
    isEditing = false;

    userInfoForm = new FormGroup({
        id: new FormControl({ value: '', disabled: true }),
        username: new FormControl({ value: '', disabled: true }, [
            Validators.required,
            Validators.min(6),
            Validators.max(20),
        ]),
        email: new FormControl({ value: '', disabled: true }, [
            Validators.required,
            Validators.email,
        ]),
        first_name: new FormControl({ value: '', disabled: true }, [
            Validators.required,
            Validators.min(2),
            Validators.max(30),
        ]),
        last_name: new FormControl({ value: '', disabled: true }, [
            Validators.required,
            Validators.min(2),
            Validators.max(30),
        ]),
        phone: new FormControl({ value: '', disabled: true }, [
            Validators.required,
        ]),
    });

    handleOnCopyID() {
        const id = this.userInfo()?.id;

        if (id) {
            navigator.clipboard.writeText(id);
            toast('✓ Copied');
        }
    }

    handleOnChangeEdit() {
        this.isEditing = true;
        this.userInfoForm.enable();
        this.userInfoForm.controls.id.disable();
    }

    handleOnCancel() {
        this.isEditing = false;
        this.userInfoForm.disable();
    }

    handleOnSave() {
        const value = this.userInfoForm.getRawValue();
        if (this.userInfoForm.valid) {
            const result: UpdateUserForm = {
                username: value.username!,
                email: value.email!,
                first_name: value.first_name!,
                last_name: value.last_name!,
                phone: value.phone!,
            };

            this._informationStore.update({
                id: value.id!,
                form: result,
                success: () => {
                    this.isEditing = false;
                    this.userInfoForm.disable();
                },
            });
        }
    }
}
