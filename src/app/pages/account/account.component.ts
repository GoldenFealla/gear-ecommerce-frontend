import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// Spartan
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';

// Components
import { CategoryListComponent } from './components/category-list/category-list.component';
import { InformationComponent } from './components/information/information.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { OrdersComponent } from './components/orders/orders.component';

// Store
import { Store } from '@ngrx/store';
import { AuthState } from 'src/store/auth/auth.state';

// Icon
import { provideIcons } from '@ng-icons/core';
import { bootstrapList, bootstrapPlus } from '@ng-icons/bootstrap-icons';
import { CategoryListMobileComponent } from './components/category-list-mobile/category-list-mobile.component';

export type AccountCategoryType = 'information' | 'addresses' | 'orders';
export type AccountCategory = {
    title: string;
    icon: string;
    to: AccountCategoryType;
};

@Component({
    selector: 'app-account',
    standalone: true,
    imports: [
        CommonModule,

        HlmSpinnerComponent,

        HlmButtonDirective,

        HlmIconComponent,

        BrnMenuTriggerDirective,

        CategoryListComponent,
        CategoryListMobileComponent,
        InformationComponent,
        AddressesComponent,
        OrdersComponent,
    ],
    templateUrl: './account.component.html',
    styleUrl: './account.component.scss',
    providers: [provideIcons({ bootstrapPlus, bootstrapList })],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
    private _store = inject(Store<{ auth: AuthState }>);

    userInfo$ = this._store.select(
        (state: { auth: AuthState }) => state.auth.userInfo
    );

    categories: AccountCategory[] = [
        {
            title: 'Information',
            icon: 'bootstrapPerson',
            to: 'information',
        },
        {
            title: 'Addresses',
            icon: 'bootstrapGeo',
            to: 'addresses',
        },
        {
            title: 'Your Orders',
            icon: 'bootstrapBag',
            to: 'orders',
        },
    ];

    currentCategory: AccountCategoryType = 'information';
}
