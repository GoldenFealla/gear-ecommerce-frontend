import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

// Spartan
import {
    HlmDialogComponent,
    HlmDialogDescriptionDirective,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import {
    BrnDialogRef,
    injectBrnDialogContext,
} from '@spartan-ng/ui-dialog-brain';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';

// Store
import { DeleteAddressDialogStore } from './delete-address-dialog.store';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-delete-address-dialog',
    standalone: true,
    imports: [
        CommonModule,

        HlmDialogComponent,
        HlmDialogHeaderComponent,
        HlmDialogFooterComponent,
        HlmDialogTitleDirective,
        HlmDialogDescriptionDirective,

        HlmButtonDirective,

        HlmSpinnerComponent,
    ],
    templateUrl: './delete-address-dialog.component.html',
    styleUrl: './delete-address-dialog.component.scss',
    providers: [DeleteAddressDialogStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAddressDialogComponent {
    private readonly _dialogRef = inject<BrnDialogRef<boolean>>(BrnDialogRef);
    private readonly _dialogContext = injectBrnDialogContext<{
        id: string;
    }>();
    private readonly _deleteAddressDialogStore = inject(
        DeleteAddressDialogStore
    );

    vm$ = this._deleteAddressDialogStore.vm$;

    handleOnCancel() {
        this._dialogRef.close(false);
    }

    handleOnSubmit() {
        this._deleteAddressDialogStore.create({
            id: this._dialogContext.id,
            success: () => {
                this._dialogRef.close(true);
            },
        });
    }
}
