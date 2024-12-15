import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

// Models
import { Response } from 'src/shared/models/response';
import { FullOrder, Order } from '@shared/models/cart';

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

    getOrder(id: string) {
        const url = new URL('/order', api).href;
        return this._httpClient.get<Response<FullOrder>>(url, {
            params: {
                id,
            },
        });
    }

    getOrderList(page: number = 1, limit: number = 10) {
        const url = new URL('/order/list', api).href;
        return this._httpClient.get<Response<Order[]>>(url, {
            params: {
                page,
                limit,
            },
        });
    }

    payCart(id: string) {
        const url = new URL('/order/pay', api).href;
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

    setQuantity(gear_id: string, quantity: string | number) {
        const url = new URL('/order/set-quantity', api).href;
        return this._httpClient.put<Response<null>>(
            url,
            {},
            {
                params: {
                    gear_id,
                    quantity,
                },
            }
        );
    }

    addToCart(id: string) {
        const url = new URL('/order/add-to-cart', api).href;
        return this._httpClient.put<Response<FullOrder>>(
            url,
            {},
            {
                params: {
                    gear_id: id,
                },
            }
        );
    }

    removeFromCart(id: string) {
        const url = new URL('/order/remove-from-cart', api).href;
        return this._httpClient.put<Response<FullOrder>>(
            url,
            {},
            {
                params: {
                    gear_id: id,
                },
            }
        );
    }
}
