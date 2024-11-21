import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

// Spartan
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import {
    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    HlmMenuItemIconDirective,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuShortcutComponent,
} from '@spartan-ng/ui-menu-helm';

// Icon
import { provideIcons } from '@ng-icons/core';
import {
    bootstrapPerson,
    bootstrapGeo,
    bootstrapBag,
    bootstrapArrowLeft,
} from '@ng-icons/bootstrap-icons';

// Parents
import {
    AccountCategoryType,
    AccountCategory,
} from '@pages/account/account.component';

@Component({
    selector: 'account-category-list-mobile',
    standalone: true,
    imports: [
        HlmIconComponent,

        HlmMenuComponent,
        HlmMenuGroupComponent,
        HlmMenuItemDirective,
        HlmMenuItemIconDirective,
        HlmMenuLabelComponent,
        HlmMenuSeparatorComponent,
        HlmMenuShortcutComponent,
    ],
    templateUrl: './category-list-mobile.component.html',
    styleUrl: './category-list-mobile.component.scss',
    providers: [
        provideIcons({
            bootstrapPerson,
            bootstrapGeo,
            bootstrapBag,
            bootstrapArrowLeft,
        }),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListMobileComponent {
    ngOnInit(): void {}

    @Input() categories!: AccountCategory[];
    @Input() current!: AccountCategoryType;
    @Output() currentChange = new EventEmitter<AccountCategoryType>();

    handleOnChangeCategory(category: AccountCategoryType) {
        if (this.current === category) return;
        this.currentChange.emit(category);
    }
}
