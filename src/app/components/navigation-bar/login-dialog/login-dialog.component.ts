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

// Models
import { LoginForm } from '../../../shared/models/auth';
import { LoginDialogStore } from './login-dialog.store';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LetDirective,

    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    HlmSpinnerComponent,

    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
  providers: [LoginDialogStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialogComponent {
  @HostBinding('class') private readonly _class: string = 'flex flex-col gap-4';

  private readonly _dialogRef = inject<BrnDialogRef<boolean>>(BrnDialogRef);
  private readonly _loginDialogStore = inject(LoginDialogStore);

  vm$ = this._loginDialogStore.vm$;

  ngOnInit() {
    this.vm$.subscribe({
      next: (value) => {
        if (value.success) {
          this._dialogRef.close(true);
        }
      },
    });
  }

  loginForm = new FormGroup({
    username_or_email: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.min(8),
      Validators.max(24),
    ]),
  });

  close() {
    this._dialogRef.close(false);
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
