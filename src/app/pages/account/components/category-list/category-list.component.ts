import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    type OnInit,
} from '@angular/core';

// Spartan
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';

// Icon
import { provideIcons } from '@ng-icons/core';
import {
    bootstrapPerson,
    bootstrapGeo,
    bootstrapBag,
} from '@ng-icons/bootstrap-icons';

import { AccountCategory, Category } from '@pages/account/account.component';

@Component({
    selector: 'account-category-list',
    standalone: true,
    imports: [
        CommonModule,
        HlmButtonDirective,
        HlmIconComponent,
        HlmCardDirective,
    ],
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss',
    providers: [provideIcons({ bootstrapPerson, bootstrapGeo, bootstrapBag })],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent implements OnInit {
    ngOnInit(): void {}

    @Input() categories!: Category[];
    @Input() current!: AccountCategory;
    @Output() currentChange = new EventEmitter<AccountCategory>();

    handleOnChangeCategory(category: AccountCategory) {
        if (this.current === category) return;
        this.currentChange.emit(category);
    }
}
