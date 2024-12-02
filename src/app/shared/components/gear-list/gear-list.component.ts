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
        if (value.page) {
            this.page = value.page;
        }
        if (value.limit) {
            this.limit = value.limit;
        }
        this._gearStore.getList(value);
        if (!this.disablePagination) {
            this._gearStore.getListCount(value);
        }
    }

    @Input() disablePagination: boolean = false;
    @Output() pageChange = new EventEmitter<number>();

    numbers: number[] = [];
    page: number = 1;
    limit: number = 10;
    maxPage: number = 0;

    ngOnInit() {
        this.vm$.subscribe((vm) => {
            if (!this.disablePagination) {
                this.maxPage = Math.ceil(vm.total / this.limit);
                const pages = Math.min(this.maxPage, 3);
                this.numbers = new Array(pages).fill(0).map((x, i) => {
                    let p = this.page;
                    if (this.page <= 1) {
                        p = 2;
                    }
                    if (this.maxPage >= 3 && this.page >= this.maxPage - 1) {
                        p = this.maxPage - 1;
                    }
                    return p - 2 + i + 1;
                });
            }
        });
    }

    changePage(page: number) {
        this.pageChange.emit(page);
    }
}
