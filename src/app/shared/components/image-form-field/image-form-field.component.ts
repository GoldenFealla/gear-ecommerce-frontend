import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    inject,
    input,
    Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgClass } from '@angular/common';

// Spartan
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';

// Shared component
import { ImageCropperDialogComponent } from '../image-cropper-dialog/image-cropper-dialog.component';

// Tailwind Variables
import { listOfCol, listOfSpan } from '@shared/models/tailwind_variables';

@Component({
    selector: 'image-form-field',
    standalone: true,
    imports: [NgClass, HlmLabelDirective, HlmInputDirective],
    templateUrl: './image-form-field.component.html',
    styleUrl: './image-form-field.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFormFieldComponent {
    private readonly _hlmDialogService = inject(HlmDialogService);
    private readonly _changeDetectorRef = inject(ChangeDetectorRef);

    control = input.required<FormControl>();

    label = input.required<string>();
    errorLabel = input<string>();

    col = input<number>(10);
    labelSpan = input<number>(2);
    inputSpan = input<number>(8);

    cols = listOfCol;
    spans = listOfSpan;

    @Output() changeFile = new EventEmitter<File>();

    imageReview: string | null = null;
    handleOnImageFileChange(event: HTMLInputElement) {
        const files = event.files;
        const file = files ? files[0] : null;

        if (file) {
            this.changeFile.emit(file);

            const imageCropperRef = this._hlmDialogService.open(
                ImageCropperDialogComponent,
                {
                    contentClass: 'sm:!max-w-[750px] min-w-[350px]',
                    context: {
                        file,
                    },
                }
            );

            imageCropperRef.closed$.subscribe((result: string | null) => {
                this.control().setValue(result);
                this.imageReview = result;

                this.control().markAsTouched();
                this._changeDetectorRef.detectChanges();
            });
        }
    }
}
