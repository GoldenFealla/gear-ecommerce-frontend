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
import {
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
} from '@spartan-ng/ui-card-helm';

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

        HlmCardDirective,
        HlmCardHeaderDirective,
        HlmCardTitleDirective,
        HlmCardContentDirective,

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
        effect(() => this.updateOriginalValue());
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
        firstName: new FormControl({ value: '', disabled: true }, [
            Validators.required,
            Validators.min(2),
            Validators.max(30),
        ]),
        lastName: new FormControl({ value: '', disabled: true }, [
            Validators.required,
            Validators.min(2),
            Validators.max(30),
        ]),
        phone: new FormControl({ value: '', disabled: true }, [
            Validators.required,
        ]),
    });

    updateOriginalValue() {
        this.userInfoForm.patchValue({
            id: this.userInfo()?.id,
            username: this.userInfo()?.username,
            email: this.userInfo()?.email,
            firstName: this.userInfo()?.first_name,
            lastName: this.userInfo()?.last_name,
            phone: this.userInfo()?.phone,
        });
    }

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
        this.updateOriginalValue();
        this.isEditing = false;
        this.userInfoForm.disable();
    }

    handleOnSave() {
        const value = this.userInfoForm.getRawValue();
        if (this.userInfoForm.valid) {
            const result: UpdateUserForm = {
                username: value.username!,
                email: value.email!,
                first_name: value.firstName!,
                last_name: value.lastName!,
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
