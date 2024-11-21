import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { MainCategory } from '@pages/main/main.component';

// Spartan
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import {
    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    HlmMenuItemIconDirective,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
} from '@spartan-ng/ui-menu-helm';

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

@Component({
    selector: 'main-category-list-mobile',
    standalone: true,
    imports: [
        HlmIconComponent,

        HlmMenuComponent,
        HlmMenuGroupComponent,
        HlmMenuItemDirective,
        HlmMenuItemIconDirective,
        HlmMenuLabelComponent,
        HlmMenuSeparatorComponent,
    ],
    templateUrl: './category-list-mobile.component.html',
    styleUrl: './category-list-mobile.component.scss',
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
export class CategoryListMobileComponent {
    @Input() categories!: MainCategory[];
    @Input() current!: MainCategory;
    @Output() currentChange = new EventEmitter<MainCategory>();

    handleOnChangeCategory(category: MainCategory) {
        if (this.current === category) return;
        this.currentChange.emit(category);
    }
}
