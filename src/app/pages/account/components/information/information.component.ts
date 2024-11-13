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
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

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

        HlmIconComponent,

        HlmLabelDirective,
        HlmInputDirective,
    ],
    templateUrl: './information.component.html',
    styleUrl: './information.component.scss',
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
        username: new FormControl({ value: '', disabled: !this.isEditing }),
        email: new FormControl({ value: '', disabled: !this.isEditing }),
    });
}
