import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Spartan
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';

// Components
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

// Component Store
import { AppStore } from './app.store';

// ngrx
import { Store } from '@ngrx/store';
import { CartState } from '@store/cart/cart.state';
import { CartActions } from '@store/cart/cart.actions';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,

        HlmSpinnerComponent,
        HlmToasterComponent,

        NavigationBarComponent,
    ],
    providers: [AppStore],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    private readonly _store = inject(Store<{ cart: CartState }>);
    private readonly _componentStore = inject(AppStore);

    ngOnInit() {
        this._componentStore.check();
        this._store.dispatch(CartActions.GetCart());
    }

    vm$ = this._componentStore.vm$;
}
