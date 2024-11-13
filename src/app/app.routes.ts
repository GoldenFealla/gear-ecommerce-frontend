import { Routes } from '@angular/router';

// Guards
import { authenticatedGuard } from '@shared/guards/Authenticated.guard';

// Components
import { NotFoundComponent } from '@pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('@pages/main/main.component').then((c) => c.MainComponent),
    },
    {
        path: 'account',
        canActivate: [authenticatedGuard],
        loadComponent: () =>
            import('@pages/account/account.component').then(
                (c) => c.AccountComponent
            ),
    },
    {
        path: 'main',
        redirectTo: '',
        pathMatch: 'full',
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];
