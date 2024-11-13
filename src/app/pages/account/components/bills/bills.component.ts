import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'account-bills',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './bills.component.html',
    styleUrl: './bills.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillsComponent {}
