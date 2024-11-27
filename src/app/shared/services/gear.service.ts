import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

// environment
import { environment } from '@environments/environment.development';

// Models
import { Response } from '@shared/models/response';
import { AddGearForm, Gear } from '@shared/models/gear';

const { api } = environment;

@Injectable({
    providedIn: 'root',
})
export class GearService {
    private _httpClient = inject(HttpClient);

    getList() {
        const url = new URL('/gear/list', api).href;
        return this._httpClient.get<Response<Gear[]>>(url);
    }

    createGear(form: AddGearForm) {
        const url = new URL('/gear/create', api).href;
        return this._httpClient.post<Response<null>>(url, form);
    }
}
