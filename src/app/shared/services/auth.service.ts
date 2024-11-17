import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

// environment
import { environment } from '@environments/environment.development';

// models
import {
    LoginForm,
    RegisterForm,
    UpdateUserForm,
    UserCredential,
    UserInfo,
} from '@models/auth';
import { Response } from '@models/response';

const { api } = environment;

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _httpClient = inject(HttpClient);

    logged() {
        const url = new URL('/user/check', api).href;
        return this._httpClient.get<Response<UserInfo | null>>(url);
    }

    register(form: RegisterForm) {
        const url = new URL('/user/register', api).href;
        return this._httpClient.post<Response<UserCredential>>(url, form);
    }

    update(id: string, form: UpdateUserForm) {
        const url = new URL('/user/update', api).href;
        return this._httpClient.put<Response<UserInfo | null>>(url, form, {
            params: { id },
        });
    }

    login(form: LoginForm) {
        const url = new URL('/user/login', api).href;
        return this._httpClient.post<Response<UserCredential>>(url, form);
    }

    logout() {
        const url = new URL('/user/logout', api).href;
        return this._httpClient.get<Response<null>>(url);
    }
}
