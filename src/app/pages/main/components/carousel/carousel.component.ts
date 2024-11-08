import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    ViewChild,
} from '@angular/core';

// Spartan
import {
    HlmCarouselComponent,
    HlmCarouselContentComponent,
    HlmCarouselItemComponent,
    HlmCarouselNextComponent,
    HlmCarouselPreviousComponent,
} from '@spartan-ng/ui-carousel-helm';
import {
    HlmCardContentDirective,
    HlmCardDirective,
} from '@spartan-ng/ui-card-helm';

@Component({
    selector: 'carousel',
    standalone: true,
    imports: [
        CommonModule,

        HlmCarouselComponent,
        HlmCarouselContentComponent,
        HlmCarouselItemComponent,
        HlmCarouselNextComponent,
        HlmCarouselPreviousComponent,

        HlmCardContentDirective,
        HlmCardDirective,
    ],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
    items = Array.from({ length: 5 }, (_, i) => i + 1);

    @ViewChild('carousel') c: HlmCarouselComponent | undefined;
    ci: any;

    ngAfterViewInit() {
        this.ci = setInterval(() => {
            if (this.c) {
                this.c.scrollNext();
            }
        }, 5000);
    }

    ngOnDestroy() {
        if (this.ci) {
            clearInterval(this.ci);
        }
    }
}
