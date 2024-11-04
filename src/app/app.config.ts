import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
    provideHttpClient,
    withFetch,
    withInterceptors,
} from '@angular/common/http';

// Interceptor
import { logInterceptor } from '@interceptors/log.interceptor';
import { credentialInterceptor } from '@interceptors/credential.interceptor';
import { provideStore } from '@ngrx/store';

// Reducers
import { AuthReducer } from './store/auth/auth.reducer';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(),
        provideHttpClient(
            withFetch(),
            withInterceptors([logInterceptor, credentialInterceptor])
        ),
        provideStore({
            auth: AuthReducer,
        }),
    ],
};
