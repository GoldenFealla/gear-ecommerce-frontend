import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

// Spartan
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';

// Components
import { CategoryListComponent } from './components/category-list/category-list.component';
import { AddGearComponent } from './components/add-gear/add-gear.component';

export type AdminCategoryType = 'add-gear';
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
    ],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
    categories: AdminCategory[] = [
        {
            title: 'Add gear',
            icon: 'bootstrapPerson',
            to: 'add-gear',
        },
    ];

    currentCategory: AdminCategoryType = 'add-gear';
}
