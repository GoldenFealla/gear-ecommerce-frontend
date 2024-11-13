import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'account-addresses',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './addresses.component.html',
    styleUrl: './addresses.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressesComponent {}
