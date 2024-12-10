import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

// environment
import { environment } from '@environments/environment.development';

// Models
import { Response } from 'src/shared/models/response';
import {
    AddGearForm,
    Gear,
    ListGearFilter,
    UpdateGearForm,
} from 'src/shared/models/gear';

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

    getGearID(id: string) {
        const url = new URL('/gear/', api).href;
        return this._httpClient.get<Response<Gear | null>>(url, {
            params: {
                id,
            },
        });
    }

    getVarietyList(category: string) {
        const url = new URL('/gear/list-variety', api).href;
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

    updateGear(id: string, form: UpdateGearForm) {
        const url = new URL('/gear/update', api).href;
        return this._httpClient.put<Response<null>>(url, form, {
            params: {
                id,
            },
        });
    }
}
