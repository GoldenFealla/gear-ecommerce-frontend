import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

// environment
import { environment } from '@environments/environment.development';

// Models
import { Response } from '@models/response';
import {
    AddAddressForm,
    Address,
    UpdateAddressForm,
} from '@shared/models/address';

const { api } = environment;

@Injectable({
    providedIn: 'root',
})
export class AddressService {
    private _httpClient = inject(HttpClient);

    getList(user_id: string) {
        const url = new URL('/address/list', api).href;
        return this._httpClient.get<Response<Address[]>>(url, {
            params: { user_id },
        });
    }

    addAddress(form: AddAddressForm) {
        const url = new URL('/address/add', api).href;
        return this._httpClient.post<Response<null>>(url, form);
    }

    updateAddress(id: string, form: UpdateAddressForm) {
        const url = new URL('/address/update', api).href;
        return this._httpClient.put<Response<null>>(url, form, {
            params: {
                id,
            },
        });
    }

    deleletAddress(id: string) {
        const url = new URL('/address/delete', api).href;
        return this._httpClient.put<Response<null>>(
            url,
            {},
            {
                params: {
                    id,
                },
            }
        );
    }
}
