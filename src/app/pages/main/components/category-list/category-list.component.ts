import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

// Spartan
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';

// Icon
import { provideIcons } from '@ng-icons/core';
import {
    bootstrapPcDisplay,
    bootstrapLaptop,
    bootstrapMotherboard,
    bootstrapCpu,
    bootstrapGpuCard,
    bootstrapMemory,
    bootstrapFan,
    bootstrapDeviceHdd,
    bootstrapDisplay,
    bootstrapKeyboard,
    bootstrapMouse,
} from '@ng-icons/bootstrap-icons';

type Category = {
    title: string;
    icon: string;
};

@Component({
    selector: 'category-list',
    standalone: true,
    imports: [
        CommonModule,
        HlmIconComponent,
        HlmButtonDirective,
        HlmCardDirective,
    ],
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss',
    providers: [
        provideIcons({
            bootstrapPcDisplay,
            bootstrapLaptop,
            bootstrapMotherboard,
            bootstrapCpu,
            bootstrapGpuCard,
            bootstrapMemory,
            bootstrapFan,
            bootstrapDeviceHdd,
            bootstrapDisplay,
            bootstrapKeyboard,
            bootstrapMouse,
        }),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent implements OnInit {
    categories: Category[] = [
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

    ngOnInit(): void {}
}
