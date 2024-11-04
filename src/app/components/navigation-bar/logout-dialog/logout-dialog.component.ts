import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    inject,
    type OnInit,
} from '@angular/core';

// ngrx
import { LetDirective } from '@ngrx/component';

// Spartan
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
    BrnDialogContentDirective,
    BrnDialogRef,
    BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import {
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogDescriptionDirective,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';

// Component Store
import { LogoutDialogStore } from './logout-dialog.store';

@Component({
    selector: 'app-comfirm-dialog',
    standalone: true,
    imports: [
        CommonModule,
        LetDirective,
        BrnDialogTriggerDirective,
        BrnDialogContentDirective,

        HlmDialogComponent,
        HlmDialogContentComponent,
        HlmDialogHeaderComponent,
        HlmDialogFooterComponent,
        HlmDialogTitleDirective,
        HlmDialogDescriptionDirective,
        HlmSpinnerComponent,

        HlmLabelDirective,
        HlmInputDirective,
        HlmButtonDirective,
    ],
    templateUrl: './logout-dialog.component.html',
    styleUrl: './logout-dialog.component.scss',
    providers: [LogoutDialogStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutDialogComponent implements OnInit {
    @HostBinding('class') private readonly _class: string =
        'flex flex-col gap-4';

    private readonly _dialogRef = inject<BrnDialogRef<boolean>>(BrnDialogRef);
    private readonly _logoutDialogStore = inject(LogoutDialogStore);

    vm$ = this._logoutDialogStore.vm$;

    ngOnInit(): void {
        this.vm$.subscribe({
            next: (value) => {
                if (value.success) {
                    this._dialogRef.close(true);
                }
            },
        });
    }

    cancel() {
        this._dialogRef.close(false);
    }

    confirm() {
        this._logoutDialogStore.logout();
    }
}
