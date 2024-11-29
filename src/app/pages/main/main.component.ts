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
import { GearListComponent } from '@shared/components/gear-list/gear-list.component';

// Model
import { CarouselComponent } from './components/carousel/carousel.component';
import { ActivatedRoute, Router } from '@angular/router';

// toast
import { toast } from 'ngx-sonner';
import { CategoryListMobileComponent } from './components/category-list-mobile/category-list-mobile.component';

// Icons
import { provideIcons } from '@ng-icons/core';
import { bootstrapList } from '@ng-icons/bootstrap-icons';

export type MainCategory = {
    title: string;
    icon: string;
    to: string;
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
    private _router = inject(Router);

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
            to: 'pc',
        },
        {
            title: 'Laptop',
            icon: 'bootstrapLaptop',
            to: 'laptop',
        },
        {
            title: 'Mainboard',
            icon: 'bootstrapMotherboard',
            to: 'mainboard',
        },
        {
            title: 'CPU',
            icon: 'bootstrapCpu',
            to: 'cpu',
        },
        {
            title: 'GPU',
            icon: 'bootstrapGpuCard',
            to: 'gpu',
        },
        {
            title: 'RAM',
            icon: 'bootstrapMemory',
            to: 'ram',
        },
        {
            title: 'Fan',
            icon: 'bootstrapFan',
            to: 'fan',
        },
        {
            title: 'SSD/HDD',
            icon: 'bootstrapDeviceHdd',
            to: 'storage',
        },
        {
            title: 'Monitor',
            icon: 'bootstrapDisplay',
            to: 'monitor',
        },
        {
            title: 'Keyboard',
            icon: 'bootstrapKeyboard',
            to: 'keyboard',
        },
        {
            title: 'Mouse',
            icon: 'bootstrapMouse',
            to: 'mouse',
        },
    ];

    currentCategory: MainCategory = this.categories[0];

    handleOnChangeCategory(category: MainCategory) {
        this._router.navigate(['/category', category.to]);
    }
}
