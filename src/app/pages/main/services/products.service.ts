import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Product } from '@shared/models/product';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    private _httpClient = inject(HttpClient);

    constructor() {}

    list() {
        return this._httpClient.get<{ products: Product[] }>(
            'https://dummyjson.com/products?limit=10&skip=10&select=title,price,description,images'
        );
    }
}
