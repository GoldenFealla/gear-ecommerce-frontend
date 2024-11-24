import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

import { AdminCategory, AdminCategoryType } from '@pages/admin/admin.component';

// Spartan
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
    selector: 'admin-category-list',
    standalone: true,
    imports: [HlmIconComponent, HlmButtonDirective, HlmCardDirective],
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
    @Input() categories!: AdminCategory[];
    @Input() current!: AdminCategoryType;
    @Output() currentChange = new EventEmitter<AdminCategoryType>();

    handleOnChangeCategory(category: AdminCategoryType) {
        if (this.current === category) return;
        this.currentChange.emit(category);
    }
}
