import { Routes } from '@angular/router';

// Guards
import { authenticatedGuard } from 'src/shared/guards/Authenticated.guard';

// Components
import { NotFoundComponent } from '@pages/404/404.component';

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
        path: 'admin/:operator',
        canActivate: [authenticatedGuard],
        loadComponent: () =>
            import('@pages/admin/admin.component').then(
                (c) => c.AdminComponent
            ),
    },
    {
        path: 'admin',
        canActivate: [authenticatedGuard],
        loadComponent: () =>
            import('@pages/admin/admin.component').then(
                (c) => c.AdminComponent
            ),
    },
    {
        path: 'category/:name',
        loadComponent: () =>
            import('@pages/category/category.component').then(
                (c) => c.CategoryComponent
            ),
    },
    {
        path: 'category',
        loadComponent: () =>
            import('@pages/category/category.component').then(
                (c) => c.CategoryComponent
            ),
    },
    {
        path: 'pay',
        loadComponent: () =>
            import('@pages/pay/pay.component').then((c) => c.PayComponent),
    },
    {
        path: 'order',
        loadComponent: () =>
            import('@pages/order/order.component').then(
                (c) => c.OrderComponent
            ),
    },
    {
        path: 'main',
        redirectTo: '',
        pathMatch: 'full',
    },
    {
        path: '404',
        component: NotFoundComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];
