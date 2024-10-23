import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, tap } from 'rxjs';

// ngrx
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { Store } from '@ngrx/store';

// Services
import { AuthService } from '@services/auth.service';

// Models
import { LoginForm } from '@models/auth';

// Store
import { AuthState } from '@store/auth/auth.state';
import { AuthActions } from '@store/auth/auth.actions';

export interface LoginDialogState {
  logging: boolean;
  success: boolean;
  message: string;
}

@Injectable()
export class LogoutDialogStore extends ComponentStore<LoginDialogState> {
  constructor(
    private authService: AuthService,
    private store: Store<{ auth: AuthState }>
  ) {
    super({
      logging: false,
      success: false,
      message: '',
    });
  }
  // *********** Updaters ************ //
  setLoggingOut = this.updater((state) => ({
    ...state,
    logging: true,
  }));

  setLogoutSuccess = this.updater((state) => ({
    ...state,
    logging: false,
    success: true,
    message: '',
  }));

  setLogoutError = this.updater((state, errorMsg: string) => ({
    ...state,
    logging: false,
    success: false,
    message: errorMsg,
  }));

  // *********** Selectors *********** //
  logging$ = this.select((state) => state.logging);
  success$ = this.select((state) => state.success);
  message$ = this.select((state) => state.message);

  // *********** Effects ************* //
  logout = this.effect<void>((trigger$) => {
    return trigger$.pipe(
      tap(() => this.setLoggingOut()),
      exhaustMap(() =>
        this.authService.logout().pipe(
          tapResponse({
            next: () => {
              this.store.dispatch(AuthActions.Logout());
              this.setLogoutSuccess();
            },
            error: (error: HttpErrorResponse) => {
              this.setLogoutError(error.error.message);
            },
          })
        )
      )
    );
  });

  // *********** ViewModel *********** //
  readonly vm$ = this.select(this.state$, (state) => ({
    logging: state.logging,
    success: state.success,
    message: state.message,
  }));
}
