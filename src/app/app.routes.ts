import { Routes } from '@angular/router';

// Components
import { NotFoundComponent } from '@pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('@pages/main/main.component').then((c) => c.MainComponent),
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
