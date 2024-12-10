import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

// rxjs
import { filter, map } from 'rxjs';

// Store
import { Store } from '@ngrx/store';
import { AuthState } from 'src/store/auth/auth.state';

export const authenticatedGuard: CanActivateFn = (route, state) => {
    const _router = inject(Router);
    const _store = inject(Store<{ auth: AuthState }>);

    return _store
        .select((state: { auth: AuthState }) => state.auth)
        .pipe(
            filter((authState) => authState.isChecked),
            // Check Authenticated
            map((authState) => {
                const isAuthenticated = authState.userInfo !== null;
                if (!isAuthenticated) {
                    _router.navigate([''], {
                        queryParams: { login: false, type: 'account' },
                    });
                }
                return isAuthenticated;
            })
        );
};
