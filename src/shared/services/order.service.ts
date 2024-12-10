import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

// Models
import { Response } from 'src/shared/models/response';
import { FullOrder } from '@shared/models/cart';

// environment
import { environment } from '@environments/environment.development';

const { api } = environment;

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private _httpClient = inject(HttpClient);

    constructor() {}

    getCart() {
        const url = new URL('/order/cart', api).href;
        return this._httpClient.get<Response<FullOrder>>(url);
    }
}
