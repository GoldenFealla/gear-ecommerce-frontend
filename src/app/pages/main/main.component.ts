import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    type OnInit,
} from '@angular/core';

// Spartan
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';

// Components
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

// Services
import { ProductsService } from './services/products.service';

// Model
import { Product } from '@shared/models/product';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ActivatedRoute } from '@angular/router';

// toast
import { toast } from 'ngx-sonner';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [
        CommonModule,

        HlmSpinnerComponent,

        CategoryListComponent,
        ProductCardComponent,
        CarouselComponent,
    ],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
    private _route = inject(ActivatedRoute);
    private _productService = inject(ProductsService);

    products: Product[] = [];

    ngOnInit(): void {
        this._productService.list().subscribe({
            next: (res) => {
                this.products = res.products;
            },
        });

        const queryParams = this._route.snapshot.queryParams;
        const { login, type } = queryParams;

        if (login && type) {
            if (login === 'false' && type === 'account') {
                toast('You are not logged in', {
                    description: 'You need to login to use account function',
                });
            }
        }
    }
}
