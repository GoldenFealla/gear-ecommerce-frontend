import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
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

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [CommonModule, BrnSelectImports, HlmSelectImports],
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit {
    private _route = inject(ActivatedRoute);
    private _router = inject(Router);

    category: string = '';

    brand: string = '';
    priceStart: string = '';
    priceEnd: string = '';

    @ViewChild('brandSelect') brandSelect: BrnSelectComponent | undefined;
    @ViewChild('priceSelect') priceSelect: BrnSelectComponent | undefined;

    ngOnInit(): void {
        this._route.params.subscribe((params) => {
            this.category = params['name'];
        });

        this._route.queryParams.subscribe((query) => {
            this.brand = query['brand'];
            this.priceStart = query['ps'];
            this.priceEnd = query['pe'];
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

            this.brandSelect.writeValue(this.brand);
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

            this.priceSelect.writeValue(`${this.priceStart},${this.priceEnd}`);
        }
    }
}
