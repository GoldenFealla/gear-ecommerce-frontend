import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    inject,
    Input,
    Output,
    ViewChild,
} from '@angular/core';

// Component store
import { GearStore } from './gear-list.store';

// Component
import { GearCardComponent } from '../gear-card/gear-card.component';
import { ListGearFilter } from '@shared/models/gear';

// Spartan
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import {
    HlmPaginationContentDirective,
    HlmPaginationDirective,
    HlmPaginationEllipsisComponent,
    HlmPaginationItemDirective,
    HlmPaginationLinkDirective,
} from '@spartan-ng/ui-pagination-helm';

@Component({
    selector: 'gear-list',
    standalone: true,
    imports: [
        CommonModule,
        GearCardComponent,
        HlmSpinnerComponent,
        HlmPaginationContentDirective,
        HlmPaginationDirective,
        HlmPaginationEllipsisComponent,
        HlmPaginationItemDirective,
        HlmPaginationLinkDirective,
    ],
    templateUrl: './gear-list.component.html',
    styleUrl: './gear-list.component.scss',
    providers: [GearStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GearListComponent {
    private readonly _gearStore = inject(GearStore);

    vm$ = this._gearStore.vm$;
    _filter: ListGearFilter | null = null;

    @Input() set filter(value: ListGearFilter) {
        this._filter = value;
        this.page = value.page;
        this._gearStore.getList(value);
        this._gearStore.getListCount(value);
    }

    @Output() brands = new EventEmitter<string[]>();
    @Output() pageChange = new EventEmitter<number>();

    numbers: number[] = [];
    page: number = 0;
    maxPage: number = 0;

    ngOnInit() {
        if (this._filter && this._filter.category) {
            this._gearStore.getBrandList(this._filter.category);
        }

        this.vm$.subscribe((vm) => {
            this.brands.emit(vm.brands);

            this.maxPage = Math.ceil(vm.total / (this._filter?.limit ?? 1));
            const pages = Math.min(this.maxPage, 3);
            this.numbers = new Array(pages).fill(0).map((x, i) => {
                let p = this.page;
                if (this.page <= 1) {
                    p = 2;
                }
                if (this.page >= this.maxPage - 1) {
                    p = this.maxPage - 1;
                }
                return p - 2 + i + 1;
            });
        });
    }

    changePage(page: number) {
        this.pageChange.emit(page);
    }
}
