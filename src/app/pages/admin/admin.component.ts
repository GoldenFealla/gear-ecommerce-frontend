import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// Spartan
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';

// Components
import { CategoryListComponent } from './components/category-list/category-list.component';
import { AddGearComponent } from './components/add-gear/add-gear.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateGearComponent } from './components/update-gear/update-gear.component';

export type AdminCategoryType = 'add-gear' | 'update-gear';
export type AdminCategory = {
    title: string;
    icon: string;
    to: AdminCategoryType;
};

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [
        CommonModule,

        HlmSpinnerComponent,

        CategoryListComponent,
        AddGearComponent,
        UpdateGearComponent,
    ],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
    private readonly _route = inject(ActivatedRoute);
    private readonly _router = inject(Router);

    ngOnInit() {
        const operator = this._route.snapshot.params['operator'];
        if (!operator) {
            this.currentCategory = 'add-gear';
            this._router.navigate(['/admin', this.currentCategory]);
        } else {
            this.currentCategory = operator;
        }
    }

    categories: AdminCategory[] = [
        {
            title: 'Add gear',
            icon: 'bootstrapPerson',
            to: 'add-gear',
        },
        {
            title: 'Update gear',
            icon: 'bootstrapPerson',
            to: 'update-gear',
        },
    ];

    currentCategory: AdminCategoryType = 'add-gear';

    handleOnChangeCategory(category: AdminCategoryType) {
        this.currentCategory = category;
        this._router.navigate(['/admin', category]);
    }
}
