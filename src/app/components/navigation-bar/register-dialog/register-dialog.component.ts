import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    inject,
    type OnInit,
} from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';

// ngrx
import { LetDirective } from '@ngrx/component';

// Spartan
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
    BrnDialogContentDirective,
    BrnDialogRef,
    BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import {
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogDescriptionDirective,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import {
    HlmAlertDescriptionDirective,
    HlmAlertDirective,
    HlmAlertIconDirective,
    HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

// Models
import { RegisterForm } from '@shared/models/auth';

// Component Store
import { RegisterDialogStore } from './register-dialog.store';

// Icon
import { provideIcons } from '@ng-icons/core';
import { lucideTriangleAlert, lucideEye, lucideEyeOff } from '@ng-icons/lucide';

export type RegisterDialogResult = 'success' | 'error' | 'cancel' | 'login';
export enum RegisterDialogState {
    SUCCESS = 'success',
    ERROR = 'error',
    CANCEL = 'cancel',
    LOGIN = 'login',
}

export function matchPasswordValidator(
    control: AbstractControl
): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password &&
        confirmPassword &&
        password.value !== confirmPassword.value
        ? { unmatch: true }
        : null;
}

@Component({
    selector: 'app-register-dialog',
    standalone: true,
    imports: [
        CommonModule,
        LetDirective,
        ReactiveFormsModule,
        BrnDialogTriggerDirective,
        BrnDialogContentDirective,

        HlmDialogComponent,
        HlmDialogContentComponent,
        HlmDialogHeaderComponent,
        HlmDialogFooterComponent,
        HlmDialogTitleDirective,
        HlmDialogDescriptionDirective,
        HlmSpinnerComponent,

        HlmAlertDirective,
        HlmAlertDescriptionDirective,
        HlmAlertIconDirective,
        HlmAlertTitleDirective,

        HlmLabelDirective,
        HlmInputDirective,
        HlmButtonDirective,
        HlmIconComponent,
    ],
    templateUrl: './register-dialog.component.html',
    styleUrl: './register-dialog.component.scss',
    providers: [
        provideIcons({ lucideTriangleAlert, lucideEye, lucideEyeOff }),
        RegisterDialogStore,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterDialogComponent implements OnInit {
    @HostBinding('class') private readonly _class: string =
        'flex flex-col gap-4';

    private readonly _dialogRef =
        inject<BrnDialogRef<RegisterDialogResult>>(BrnDialogRef);
    private readonly _registerDialogStore = inject(RegisterDialogStore);

    vm$ = this._registerDialogStore.vm$;

    registerForm = new FormGroup(
        {
            username: new FormControl('', [
                Validators.required,
                Validators.min(6),
                Validators.max(20),
            ]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,
                Validators.min(8),
                Validators.max(24),
            ]),
            confirmPassword: new FormControl('', Validators.required),
        },
        [matchPasswordValidator]
    );

    // getter
    get username() {
        return this.registerForm.get('username');
    }

    get email() {
        return this.registerForm.get('email');
    }

    get password() {
        return this.registerForm.get('password');
    }

    get confirmPassword() {
        return this.registerForm.get('confirmPassword');
    }

    showPassword = false;
    showConfirmPassword = false;

    ngOnInit() {
        this.vm$.subscribe({
            next: (value) => {
                if (value.success) {
                    this._dialogRef.close(RegisterDialogState.SUCCESS);
                }
            },
        });
    }

    cancel() {
        this._dialogRef.close(RegisterDialogState.CANCEL);
    }

    login() {
        this._dialogRef.close(RegisterDialogState.LOGIN);
    }

    submit() {
        const value = this.registerForm.value;
        if (this.registerForm.valid) {
            const result: RegisterForm = {
                username: value.username!,
                email: value.email!,
                password: value.password!,
            };

            this._registerDialogStore.register(result);
        }
    }
}
