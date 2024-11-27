import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GearCardComponent } from '../product-card/gear-card.component';

// Component store
import { GearStore } from './gear-list.store';

@Component({
    selector: 'gear-list',
    standalone: true,
    imports: [CommonModule, GearCardComponent],
    templateUrl: './gear-list.component.html',
    styleUrl: './gear-list.component.scss',
    providers: [GearStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GearListComponent {
    private readonly _gearStore = inject(GearStore);

    vm$ = this._gearStore.vm$;

    ngOnInit() {
        this._gearStore.getList();
    }
}
