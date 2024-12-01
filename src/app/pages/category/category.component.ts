import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
    ViewChild,
    type OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

// Spartan
import {
    BrnSelectComponent,
    BrnSelectImports,
} from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';

// Shared Components
import { GearListComponent } from '@shared/components/gear-list/gear-list.component';

// Component
import { CategoryStore } from './category.store';

// Models
import { ListGearFilter, ListGearFilterKey } from '@shared/models/gear';
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
    providers: [CategoryStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit {
    private readonly _route = inject(ActivatedRoute);
    private readonly _router = inject(Router);
    private readonly _categoryStore = inject(CategoryStore);

    filter = new BehaviorSubject<ListGearFilter>({});

    vm$ = this._categoryStore.vm$;

    @ViewChild('sortSelect') sortSelect: BrnSelectComponent | undefined;
    @ViewChild('priceSelect') priceSelect: BrnSelectComponent | undefined;
    @ViewChild('brandSelect') brandSelect: BrnSelectComponent | undefined;
    @ViewChild('varietySelect') varietySelect: BrnSelectComponent | undefined;

    ngOnInit(): void {
        this._route.params.subscribe((params) => {
            const category = params['name'];

            if (category) {
                this.filter.next({ ...this.filter.value, category });
                this._categoryStore.getBrandList(category);
                this._categoryStore.getVarietyList(category);
            } else {
                this._router.navigate(['/']);
            }
        });

        this._route.queryParams.subscribe((query) => {
            this.updateSelect(query, 'page', 1);
            this.updateSelect(query, 'brand');
            this.updateSelect(query, 'price');
            this.updateSelect(query, 'sort');
            this.updateSelect(query, 'variety');
        });
    }

    ngAfterViewInit() {
        if (this.brandSelect) {
            this.routeSelect(this.brandSelect, 'brand');
        }

        if (this.varietySelect) {
            this.routeSelect(this.varietySelect, 'variety');
        }

        if (this.priceSelect) {
            this.routeSelect(this.priceSelect, 'price');
        }

        if (this.sortSelect) {
            this.routeSelect(this.sortSelect, 'sort');
        }
    }

    updateSelect(query: Params, key: ListGearFilterKey, defaultValue?: any) {
        const nextValue = {
            ...this.filter.value,
        };

        const value =
            typeof nextValue[key] === 'number'
                ? Number(query[key])
                : query[key];

        if (value) {
            nextValue[key] = value;
        } else if (defaultValue) {
            nextValue[key] = defaultValue;
        } else {
            nextValue[key] = undefined;
        }

        this.filter.next(nextValue);
    }

    routeSelect(select: BrnSelectComponent, key: ListGearFilterKey) {
        const params: Params = {};

        select.registerOnChange((value: string) => {
            params[key] = value === '' ? null : value;

            this._router.navigate([], {
                queryParams: params,
                queryParamsHandling: 'merge',
            });
        });

        const property = this.filter.value[key];

        if (property) {
            select.writeValue(property);
        }
    }

    handleOnPageChange(page: number) {
        this._router.navigate([], {
            queryParams: { page: page },
            queryParamsHandling: 'merge',
        });
    }
}
