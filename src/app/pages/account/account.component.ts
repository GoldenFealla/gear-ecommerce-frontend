import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// Spartan
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import {
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
} from '@spartan-ng/ui-card-helm';

// Components
import { CategoryListComponent } from './components/category-list/category-list.component';
import { InformationComponent } from './components/information/information.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { BillsComponent } from './components/bills/bills.component';

// Store
import { Store } from '@ngrx/store';
import { AuthState } from '@store/auth/auth.state';

@Component({
    selector: 'app-account',
    standalone: true,
    imports: [
        CommonModule,

        HlmSpinnerComponent,

        HlmCardDirective,
        HlmCardHeaderDirective,
        HlmCardTitleDirective,
        HlmCardContentDirective,

        CategoryListComponent,
        InformationComponent,
        AddressesComponent,
        BillsComponent,
    ],
    templateUrl: './account.component.html',
    styleUrl: './account.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
    private _store = inject(Store<{ auth: AuthState }>);

    userInfo$ = this._store.select(
        (state: { auth: AuthState }) => state.auth.userInfo
    );

    currentCategory = 'information';

    ngOnInit() {
        this.userInfo$.subscribe(console.log);
    }

    handleCategory(current: 'information' | 'addresses' | 'bills') {
        this.currentCategory = current;
    }
}
