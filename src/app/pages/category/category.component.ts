import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
    ViewChild,
    type OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Spartan
import {
    BrnSelectComponent,
    BrnSelectImports,
} from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';

// Shared Components
import { GearListComponent } from '@shared/components/gear-list/gear-list.component';

// Models
import { ListGearFilter } from '@shared/models/gear';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [
        CommonModule,
        BrnSelectImports,
        HlmSelectImports,
        GearListComponent,
    ],
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit {
    private _route = inject(ActivatedRoute);
    private _router = inject(Router);

    filter = new BehaviorSubject<ListGearFilter>({
        page: 1,
        limit: 10,
        category: '',
        brand: undefined,
        start_price: undefined,
        end_price: undefined,
        sort: undefined,
    });

    brands: string[] = [];

    @ViewChild('sortSelect') sortSelect: BrnSelectComponent | undefined;
    @ViewChild('priceSelect') priceSelect: BrnSelectComponent | undefined;
    @ViewChild('brandSelect') brandSelect: BrnSelectComponent | undefined;

    ngOnInit(): void {
        this._route.params.subscribe((params) => {
            if (params['name']) {
                this.filter.next({
                    ...this.filter.value,
                    category: params['name'],
                });
            }
        });

        this._route.queryParams.subscribe((query) => {
            if (query['page']) {
                this.filter.next({
                    ...this.filter.value,
                    page: parseInt(query['page']),
                });
            } else {
                this.filter.next({
                    ...this.filter.value,
                    page: 1,
                });
            }

            if (query['brand']) {
                this.filter.next({
                    ...this.filter.value,
                    brand: query['brand'],
                });
            } else {
                this.filter.next({
                    ...this.filter.value,
                    brand: undefined,
                });
            }

            if (query['ps']) {
                this.filter.next({
                    ...this.filter.value,
                    start_price: query['ps'],
                });
            } else {
                this.filter.next({
                    ...this.filter.value,
                    start_price: undefined,
                });
            }

            if (query['pe']) {
                this.filter.next({
                    ...this.filter.value,
                    end_price: query['pe'],
                });
            } else {
                this.filter.next({
                    ...this.filter.value,
                    end_price: undefined,
                });
            }

            if (query['sort']) {
                this.filter.next({
                    ...this.filter.value,
                    sort: query['sort'],
                });
            } else {
                this.filter.next({
                    ...this.filter.value,
                    sort: undefined,
                });
            }
        });
    }

    ngAfterViewInit() {
        if (this.brandSelect) {
            this.brandSelect.registerOnChange((value: string) => {
                if (value === '') {
                    this._router.navigate([], {
                        queryParams: { brand: null },
                        queryParamsHandling: 'merge',
                    });
                } else {
                    this._router.navigate([], {
                        queryParams: { brand: value },
                        queryParamsHandling: 'merge',
                    });
                }
            });

            if (this.filter.value.brand) {
                this.brandSelect.writeValue(this.filter.value.brand);
            }
        }

        if (this.priceSelect) {
            this.priceSelect.registerOnChange((value: string) => {
                if (value === '') {
                    this._router.navigate([], {
                        queryParams: { ps: null, pe: null },
                        queryParamsHandling: 'merge',
                    });
                } else {
                    const prices = value.split(',');
                    const priceStart = prices[0];
                    const priceEnd = prices[1];

                    this._router.navigate([], {
                        queryParams: { ps: priceStart, pe: priceEnd },
                        queryParamsHandling: 'merge',
                    });
                }
            });

            const start_price = this.filter.value.start_price;
            const end_price = this.filter.value.end_price;

            if (start_price && end_price) {
                this.priceSelect.writeValue(`${start_price},${end_price}`);
            }
        }

        if (this.sortSelect) {
            this.sortSelect.registerOnChange((value: string) => {
                if (value === '') {
                    this._router.navigate([], {
                        queryParams: { sort: null },
                        queryParamsHandling: 'merge',
                    });
                } else {
                    this._router.navigate([], {
                        queryParams: { sort: value },
                        queryParamsHandling: 'merge',
                    });
                }
            });

            if (this.filter.value.sort) {
                this.sortSelect.writeValue(`${this.filter.value.sort}`);
            }
        }
    }

    handleGetBrands(brands: string[]) {
        this.brands = [...brands];
    }

    handleOnPageChange(page: number) {
        this._router.navigate([], {
            queryParams: { page: page },
            queryParamsHandling: 'merge',
        });
    }
}
