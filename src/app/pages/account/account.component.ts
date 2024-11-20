import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// Spartan
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';

// Components
import { CategoryListComponent } from './components/category-list/category-list.component';
import { InformationComponent } from './components/information/information.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { BillsComponent } from './components/bills/bills.component';

// Store
import { Store } from '@ngrx/store';
import { AuthState } from '@store/auth/auth.state';

// Icon
import { provideIcons } from '@ng-icons/core';
import { bootstrapPlus } from '@ng-icons/bootstrap-icons';

@Component({
    selector: 'app-account',
    standalone: true,
    imports: [
        CommonModule,

        HlmSpinnerComponent,

        CategoryListComponent,
        InformationComponent,
        AddressesComponent,
        BillsComponent,
    ],
    templateUrl: './account.component.html',
    styleUrl: './account.component.scss',
    providers: [provideIcons({ bootstrapPlus })],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
    private _store = inject(Store<{ auth: AuthState }>);

    userInfo$ = this._store.select(
        (state: { auth: AuthState }) => state.auth.userInfo
    );

    currentCategory = 'information';

    handleCategory(current: 'information' | 'addresses' | 'bills') {
        this.currentCategory = current;
    }
}
