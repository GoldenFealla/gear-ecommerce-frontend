import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Spartan
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';

// ngrx
import { Store } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';

// Components
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

// Component Store
import { AppStore } from './app.store';

// Store
import { AuthState } from '@store/auth/auth.state';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LetDirective,

    HlmSpinnerComponent,

    NavigationBarComponent,
  ],
  providers: [AppStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _componentStore = inject(AppStore);

  ngOnInit() {
    this._componentStore.check();
  }

  vm$ = this._componentStore.vm$;
}
