import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

// Spartan
import {
    BrnDialogRef,
    injectBrnDialogContext,
} from '@spartan-ng/ui-dialog-brain';
import { HlmDialogModule } from '@spartan-ng/ui-dialog-helm';

// ngx-image-cropper
import {
    ImageCroppedEvent,
    ImageCropperComponent,
    LoadedImage,
} from 'ngx-image-cropper';

// Toast
import { toast } from 'ngx-sonner';

@Component({
    selector: 'app-image-cropper-dialog',
    standalone: true,
    imports: [ImageCropperComponent, HlmDialogModule, HlmButtonDirective],
    templateUrl: './image-cropper-dialog.component.html',
    styleUrl: './image-cropper-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCropperDialogComponent {
    private readonly sanitizer = inject(DomSanitizer);
    private readonly _dialogRef =
        inject<BrnDialogRef<string | null>>(BrnDialogRef);
    private readonly _dialogContext = injectBrnDialogContext<{ file: File }>();

    imageFile = this._dialogContext.file;

    imageBase64: string | null = null;
    croppedImage: SafeUrl = '';

    blobToBase64(blob: Blob) {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    async imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
            event.objectUrl!
        );

        this.imageBase64 = (await this.blobToBase64(event.blob!)) as string;
    }

    imageLoaded(image: LoadedImage) {
        toast('Load image successfully');
    }

    cropperReady() {
        // cropper ready
    }

    loadImageFailed() {
        toast('Load image failed', {
            description: 'Unsupported image file',
        });
    }

    handleOnCancel() {
        this._dialogRef.close(null);
    }

    handleOnSave() {
        this._dialogRef.close(this.imageBase64);
    }
}
