import { Pipe, type PipeTransform } from '@angular/core';

//model
import { OrderGear } from '@shared/models/cart';

@Pipe({
    name: 'TotalPrice',
    standalone: true,
})
export class TotalPricePipe implements PipeTransform {
    transform(gearOrder: OrderGear[]): number {
        let total = 0;
        gearOrder.forEach((cur) => {
            total = total + cur.quantity * cur.gear.discount;
        });
        return total;
    }
}
