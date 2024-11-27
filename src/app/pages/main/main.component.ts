import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    type OnInit,
} from '@angular/core';

// Spartan
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

// Components
import { CategoryListComponent } from './components/category-list/category-list.component';

// Model
import { CarouselComponent } from './components/carousel/carousel.component';
import { ActivatedRoute } from '@angular/router';

// toast
import { toast } from 'ngx-sonner';
import { CategoryListMobileComponent } from './components/category-list-mobile/category-list-mobile.component';

// Icons
import { provideIcons } from '@ng-icons/core';
import { bootstrapList } from '@ng-icons/bootstrap-icons';
import { GearListComponent } from './components/gear-list/gear-list.component';

export type MainCategory = {
    title: string;
    icon: string;
};

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [
        CommonModule,

        HlmButtonDirective,

        HlmSpinnerComponent,

        HlmIconComponent,

        BrnMenuTriggerDirective,

        CategoryListComponent,
        CategoryListMobileComponent,
        CarouselComponent,
        GearListComponent,
    ],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    providers: [provideIcons({ bootstrapList })],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
    private _route = inject(ActivatedRoute);

    ngOnInit(): void {
        const queryParams = this._route.snapshot.queryParams;
        const { login, type } = queryParams;

        if (login && type) {
            if (login === 'false' && type === 'account') {
                toast('You are not logged in', {
                    description: 'You need to login to use account function',
                });
            }
        }
    }

    categories: MainCategory[] = [
        {
            title: 'PC',
            icon: 'bootstrapPcDisplay',
        },
        {
            title: 'Laptop',
            icon: 'bootstrapLaptop',
        },
        {
            title: 'Mainboard',
            icon: 'bootstrapMotherboard',
        },
        {
            title: 'CPU',
            icon: 'bootstrapCpu',
        },
        {
            title: 'GPU',
            icon: 'bootstrapGpuCard',
        },
        {
            title: 'RAM',
            icon: 'bootstrapMemory',
        },
        {
            title: 'Fan',
            icon: 'bootstrapFan',
        },
        {
            title: 'SSD/HDD',
            icon: 'bootstrapDeviceHdd',
        },
        {
            title: 'Monitor',
            icon: 'bootstrapDisplay',
        },
        {
            title: 'Keyboard',
            icon: 'bootstrapKeyboard',
        },
        {
            title: 'Mouse',
            icon: 'bootstrapMouse',
        },
    ];

    currentCategory: MainCategory = this.categories[0];
}
