import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    effect,
    input,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

// Models
import { UserInfo } from '@shared/models/auth';

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
    providers: [provideIcons({ bootstrapCopy, bootstrapPencilFill })],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
    constructor() {
        effect(() => {
            this.userInfoForm.patchValue({
                id: this.userInfo()?.id,
                username: this.userInfo()?.username,
                email: this.userInfo()?.email,
            });
        });
    }

    userInfo = input<UserInfo | null>(null);
    isEditing = false;

    userInfoForm = new FormGroup({
        id: new FormControl({ value: '', disabled: true }),
        username: new FormControl({ value: '', disabled: true }),
        email: new FormControl({ value: '', disabled: true }),
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

    handleOnSave() {}
}
