import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  type OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
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
import { RegisterForm } from '@shared/models/auth';

// Component Store
import { RegisterDialogStore } from './register-dialog.store';

export type RegisterDialogResult = 'success' | 'error' | 'cancel' | 'login';

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

    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
  ],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.scss',
  providers: [RegisterDialogStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterDialogComponent implements OnInit {
  @HostBinding('class') private readonly _class: string = 'flex flex-col gap-4';

  private readonly _dialogRef =
    inject<BrnDialogRef<RegisterDialogResult>>(BrnDialogRef);
  private readonly _registerDialogStore = inject(RegisterDialogStore);

  vm$ = this._registerDialogStore.vm$;

  registerForm = new FormGroup({
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
  });

  ngOnInit() {
    this.vm$.subscribe({
      next: (value) => {
        if (value.success) {
          this._dialogRef.close('success');
        }
      },
    });
  }

  cancel() {
    this._dialogRef.close('cancel');
  }

  login() {
    this._dialogRef.close('login');
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
