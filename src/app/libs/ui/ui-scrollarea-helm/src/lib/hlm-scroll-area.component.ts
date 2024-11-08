import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation,
    booleanAttribute,
    computed,
    signal,
} from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import type { ClassValue } from 'clsx';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
    selector: 'hlm-scroll-area',
    standalone: true,
    imports: [NgScrollbarModule],
    template: `
        <ng-scrollbar
            [visibility]="_visibility()"
            [orientation]="_track()"
            [style]="{
                '--scrollbar-border-radius': '100px',
                '--scrollbar-padding': '1px',
                '--scrollbar-thumb-color': 'hsl(var(--border)',
                '--scrollbar-thumb-hover-color': 'hsl(var(--border)',
                '--scrollbar-size': '7px'
            }"
        >
            <ng-content />
        </ng-scrollbar>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': '_computedClass()',
    },
})
export class HlmScrollAreaComponent {
    protected readonly _computedClass = computed(() =>
        hlm('block', this._class())
    );

    @Input()
    set class(value: ClassValue) {
        this._class.set(value);
    }

    private readonly _class = signal<ClassValue>('');

    @Input()
    set track(value: 'vertical' | 'horizontal' | 'auto') {
        this._track.set(value);
    }

    protected readonly _track = signal<'vertical' | 'horizontal' | 'auto'>(
        'auto'
    );

    @Input({ transform: booleanAttribute })
    set autoHeightDisabled(value: boolean) {
        this._autoHeightDisabled.set(value);
    }

    protected readonly _autoHeightDisabled = signal(true);

    @Input({ transform: booleanAttribute })
    set autoWidthDisabled(value: boolean) {
        this._autoWidthDisabled.set(value);
    }

    protected readonly _autoWidthDisabled = signal(true);

    @Input()
    set visibility(value: 'hover' | 'visible' | 'native') {
        this._visibility.set(value);
    }

    protected readonly _visibility = signal<'hover' | 'visible' | 'native'>(
        'native'
    );
}
