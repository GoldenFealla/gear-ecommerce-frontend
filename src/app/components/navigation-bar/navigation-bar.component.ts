import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

// ngrx
import { Store } from '@ngrx/store';

// Spartan
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    HlmMenuItemIconDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuShortcutComponent,
    HlmSubMenuComponent,
} from '@spartan-ng/ui-menu-helm';

// Icon
import { provideIcons } from '@ng-icons/core';
import {
    lucideShoppingCart,
    lucideMoon,
    lucideSun,
    lucideUser,
    lucideSettings,
    lucideLogOut,
} from '@ng-icons/lucide';

// Components
import {
    LoginDialogComponent,
    LoginDialogResult,
} from './login-dialog/login-dialog.component';
import {
    RegisterDialogResult,
    RegisterDialogComponent,
    RegisterDialogState,
} from './register-dialog/register-dialog.component';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';

// Services
import { ThemeService } from '@shared/services/theme.service';

// Store
import { AuthState } from '@store/auth/auth.state';

@Component({
    selector: 'app-navigation-bar',
    standalone: true,
    imports: [
        CommonModule,

        HlmIconComponent,

        HlmButtonDirective,

        HlmAvatarComponent,
        HlmAvatarFallbackDirective,
        HlmAvatarImageDirective,

        BrnMenuTriggerDirective,
        HlmMenuComponent,
        HlmMenuGroupComponent,
        HlmMenuItemDirective,
        HlmMenuItemIconDirective,
        HlmMenuItemSubIndicatorComponent,
        HlmMenuLabelComponent,
        HlmMenuSeparatorComponent,
        HlmMenuShortcutComponent,
        HlmSubMenuComponent,
    ],
    templateUrl: './navigation-bar.component.html',
    styleUrl: './navigation-bar.component.scss',
    providers: [
        provideIcons({
            lucideShoppingCart,
            lucideMoon,
            lucideSun,
            lucideUser,
            lucideSettings,
            lucideLogOut,
        }),
        ThemeService,
    ],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class NavigationBarComponent {
    private readonly _themeService = inject(ThemeService);
    private readonly _hlmDialogService = inject(HlmDialogService);
    private readonly _store = inject(Store<{ auth: AuthState }>);
    private readonly _router = inject(Router);

    theme$ = this._themeService.theme$;
    userInfo$ = this._store.select(
        (state: { auth: AuthState }) => state.auth.userInfo
    );

    toggleTheme(): void {
        this._themeService.toggleDarkMode();
    }

    login() {
        const loginDialogRef = this._hlmDialogService.open(
            LoginDialogComponent,
            {
                contentClass: 'sm:!max-w-[750px] min-w-[500px]',
            }
        );

        loginDialogRef.closed$.subscribe((result: LoginDialogResult) => {
            if (result === LoginDialogResult.SUCCESS) {
                this._router.navigateByUrl('/');
            }

            if (result === LoginDialogResult.REGISTER) {
                this.register();
            }
        });
    }

    register() {
        const registerDialogRef = this._hlmDialogService.open(
            RegisterDialogComponent,
            {
                contentClass: 'sm:!max-w-[750px] min-w-[500px]',
            }
        );

        registerDialogRef.closed$.subscribe((result: RegisterDialogResult) => {
            if (result === RegisterDialogState.SUCCESS) {
                this._router.navigateByUrl('/');
            }

            if (result === RegisterDialogState.LOGIN) {
                this.login();
            }
        });
    }

    logout() {
        const dialogRef = this._hlmDialogService.open(LogoutDialogComponent, {
            contentClass: 'sm:!max-w-[750px]  min-w-[500px]',
        });
        dialogRef.closed$.subscribe((result: boolean) => {
            if (result) {
                this._router.navigateByUrl('/');
            }
        });
    }
}
