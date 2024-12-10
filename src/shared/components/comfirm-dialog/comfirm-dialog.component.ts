import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    inject,
    type OnInit,
} from '@angular/core';

// Spartan
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
    BrnDialogContentDirective,
    BrnDialogRef,
    BrnDialogTriggerDirective,
    injectBrnDialogContext,
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

@Component({
    selector: 'app-comfirm-dialog',
    standalone: true,
    imports: [
        CommonModule,

        HlmDialogComponent,
        HlmDialogHeaderComponent,
        HlmDialogFooterComponent,
        HlmDialogTitleDirective,
        HlmDialogDescriptionDirective,

        HlmButtonDirective,
    ],
    templateUrl: './comfirm-dialog.component.html',
    styleUrl: './comfirm-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComfirmDialogComponent implements OnInit {
    ngOnInit(): void {}

    @HostBinding('class') private readonly _class: string =
        'flex flex-col gap-4';

    private readonly _dialogRef = inject<BrnDialogRef<boolean>>(BrnDialogRef);
    private readonly _dialogContext = injectBrnDialogContext<{
        title: string;
        description: string;
    }>();

    protected readonly title = this._dialogContext.title;
    protected readonly description = this._dialogContext.description;

    cancel() {
        this._dialogRef.close(false);
    }

    confirm() {
        this._dialogRef.close(true);
    }
}
