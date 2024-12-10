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
import { logInterceptor } from 'src/shared/interceptors/log.interceptor';
import { credentialInterceptor } from 'src/shared/interceptors/credential.interceptor';

// Reducers
import { provideStore } from '@ngrx/store';
import { AuthReducer } from '../store/auth/auth.reducer';
import { CartReducer } from '@store/cart/cart.reducer';

// Effects
import { provideEffects } from '@ngrx/effects';
import { CartEffects } from '@store/cart/cart.effects';

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
            cart: CartReducer,
        }),
        provideEffects(CartEffects),
    ],
};
