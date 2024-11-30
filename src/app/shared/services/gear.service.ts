import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

// environment
import { environment } from '@environments/environment.development';

// Models
import { Response } from '@shared/models/response';
import { AddGearForm, Gear, ListGearFilter } from '@shared/models/gear';

const { api } = environment;

@Injectable({
    providedIn: 'root',
})
export class GearService {
    private _httpClient = inject(HttpClient);

    getList(filter: ListGearFilter) {
        const url = new URL('/gear/list', api).href;
        const params: Record<string, any> = {};

        Object.keys(filter).forEach((key: string) => {
            const value = filter[key as keyof typeof filter];
            if (value !== null && value !== undefined) {
                params[key] = value;
            }
        });

        return this._httpClient.get<Response<Gear[]>>(url, {
            params: params,
        });
    }

    getListCount(filter: ListGearFilter) {
        const url = new URL('/gear/list-count', api).href;
        const params: Record<string, any> = {};

        Object.keys(filter).forEach((key: string) => {
            const value = filter[key as keyof typeof filter];
            if (value !== null && value !== undefined) {
                params[key] = value;
            }
        });

        return this._httpClient.get<Response<number>>(url, {
            params: params,
        });
    }

    getBrandList(category: string) {
        const url = new URL('/gear/list-brand', api).href;
        return this._httpClient.get<Response<string[]>>(url, {
            params: {
                category,
            },
        });
    }

    createGear(form: AddGearForm) {
        const url = new URL('/gear/create', api).href;
        return this._httpClient.post<Response<null>>(url, form);
    }
}
