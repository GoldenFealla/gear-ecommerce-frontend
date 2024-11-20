import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
} from '@angular/core';

// Spartan
import {
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';

// Store
import { AddressStore } from './addresses.store';

// Models
import { UserInfo } from '@shared/models/auth';
import { Address } from '@shared/models/address';

// Icon
import { provideIcons } from '@ng-icons/core';
import {
    bootstrapPencilFill,
    bootstrapPlus,
    bootstrapTrash,
} from '@ng-icons/bootstrap-icons';

// Component
import { AddAddressDialogComponent } from './components/add-address-dialog/add-address-dialog.component';
import { UpdateAddressDialogComponent } from './components/update-address-dialog/update-address-dialog.component';
import { DeleteAddressDialogComponent } from './components/delete-address-dialog/delete-address-dialog.component';

@Component({
    selector: 'account-addresses',
    standalone: true,
    imports: [
        CommonModule,

        HlmButtonDirective,

        HlmIconComponent,

        HlmSpinnerComponent,

        HlmCardDirective,
        HlmCardHeaderDirective,
        HlmCardTitleDirective,
        HlmCardContentDirective,
    ],
    templateUrl: './addresses.component.html',
    styleUrl: './addresses.component.scss',
    providers: [
        AddressStore,
        provideIcons({ bootstrapPlus, bootstrapPencilFill, bootstrapTrash }),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressesComponent {
    private readonly _hlmDialogService = inject(HlmDialogService);
    private readonly _addressStore = inject(AddressStore);
    userInfo = input<UserInfo | null>();

    vm$ = this._addressStore.vm$;

    ngOnInit() {
        this.getAddressList();
    }

    getAddressList() {
        const user_id = this.userInfo()?.id;

        if (user_id) {
            this._addressStore.getList(user_id);
        }
    }

    handleOnAddAddress() {
        const addAddressDialogRef = this._hlmDialogService.open(
            AddAddressDialogComponent,
            {
                context: {
                    user_id: this.userInfo()?.id!,
                },
                contentClass:
                    'min-w-[350px] sm:!max-w-[750px] sm:min-w-[450px]',
            }
        );

        addAddressDialogRef.closed$.subscribe((result) => {
            if (result) {
                this.getAddressList();
            }
        });
    }

    handleOnUpdateAddress(address: Address) {
        const updateAddressDialogRef = this._hlmDialogService.open(
            UpdateAddressDialogComponent,
            {
                context: {
                    address,
                },
                contentClass:
                    'min-w-[350px] sm:!max-w-[750px] sm:min-w-[450px]',
            }
        );

        updateAddressDialogRef.closed$.subscribe((result) => {
            if (result) {
                this.getAddressList();
            }
        });
    }

    handleOnDeleteAddress(id: string) {
        const deleteAddressDialogRef = this._hlmDialogService.open(
            DeleteAddressDialogComponent,
            {
                context: {
                    id,
                },
                contentClass:
                    'min-w-[350px] sm:!max-w-[750px] sm:min-w-[450px]',
            }
        );

        deleteAddressDialogRef.closed$.subscribe((result) => {
            if (result) {
                this.getAddressList();
            }
        });
    }
}
