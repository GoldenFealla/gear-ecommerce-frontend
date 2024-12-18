import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

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

import { MainCategory } from '@pages/main/main.component';

@Component({
    selector: 'main-category-list',
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
export class CategoryListComponent {
    @Input() categories!: MainCategory[];
    @Input() current!: MainCategory;
    @Output() currentChange = new EventEmitter<MainCategory>();

    handleOnChangeCategory(category: MainCategory) {
        if (this.current === category) return;
        this.currentChange.emit(category);
    }
}
