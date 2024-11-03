import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  type OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
import { LoginForm } from '../../../shared/models/auth';

// Component Store
import { LoginDialogStore } from './login-dialog.store';

// Icon
import { provideIcons } from '@ng-icons/core';
import { lucideTriangleAlert, lucideEye, lucideEyeOff } from '@ng-icons/lucide';

export enum LoginDialogResult {
  SUCCESS = 'success',
  ERROR = 'error',
  CANCEL = 'cancel',
  REGISTER = 'register',
}

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,

    HlmAlertDirective,
    HlmAlertDescriptionDirective,
    HlmAlertIconDirective,
    HlmAlertTitleDirective,

    HlmSpinnerComponent,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    HlmIconComponent,
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
  providers: [
    provideIcons({ lucideTriangleAlert, lucideEye, lucideEyeOff }),
    LoginDialogStore,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialogComponent {
  @HostBinding('class') private readonly _class: string = 'flex flex-col gap-4';

  private readonly _dialogRef =
    inject<BrnDialogRef<LoginDialogResult>>(BrnDialogRef);
  private readonly _loginDialogStore = inject(LoginDialogStore);

  vm$ = this._loginDialogStore.vm$;

  ngOnInit() {
    this.vm$.subscribe({
      next: (value) => {
        if (value.success) {
          this._dialogRef.close(LoginDialogResult.SUCCESS);
        }
      },
    });
  }

  loginForm = new FormGroup({
    username_or_email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.min(8),
      Validators.max(24),
    ]),
  });

  // getter
  get username_or_email() {
    return this.loginForm.get('username_or_email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  close() {
    this._dialogRef.close(LoginDialogResult.CANCEL);
  }

  register() {
    this._dialogRef.close(LoginDialogResult.REGISTER);
  }

  submit() {
    const value = this.loginForm.value;
    if (this.loginForm.valid) {
      const result: LoginForm = {
        username_or_email: value.username_or_email!,
        password: value.password!,
      };

      this._loginDialogStore.login(result);
    }
  }
}
