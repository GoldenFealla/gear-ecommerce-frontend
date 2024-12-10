import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
    name: 'DiscountPercent',
    standalone: true,
})
export class DiscountPercentPipe implements PipeTransform {
    transform(price: number, discount: number): string {
        const percent = ((price - discount) * 100) / price;
        return '-' + percent.toFixed(0) + '%';
    }
}
