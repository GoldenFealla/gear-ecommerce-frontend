import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './404.component.html',
    styleUrl: './404.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent implements OnInit {
    ngOnInit(): void {}
}
