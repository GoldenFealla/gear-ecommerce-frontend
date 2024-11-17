import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Output,
    type OnInit,
} from '@angular/core';

// Spartan
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';

// Icon
import { provideIcons } from '@ng-icons/core';
import {
    bootstrapPerson,
    bootstrapGeo,
    bootstrapBag,
} from '@ng-icons/bootstrap-icons';

type Category = {
    title: string;
    icon: string;
    to: 'information' | 'addresses' | 'bills';
};

@Component({
    selector: 'account-category-list',
    standalone: true,
    imports: [
        CommonModule,
        HlmButtonDirective,
        HlmIconComponent,
        HlmCardDirective,
    ],
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss',
    providers: [provideIcons({ bootstrapPerson, bootstrapGeo, bootstrapBag })],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent implements OnInit {
    ngOnInit(): void {}

    @Output() current = new EventEmitter<
        'information' | 'addresses' | 'bills'
    >();

    _current: 'information' | 'addresses' | 'bills' = 'information';

    categories: Category[] = [
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
            title: 'Your Bill',
            icon: 'bootstrapBag',
            to: 'bills',
        },
    ];

    handleOnChangeCategory(category: 'information' | 'addresses' | 'bills') {
        if (this._current === category) return;
        this._current = category;
        this.current.emit(category);
    }
}
