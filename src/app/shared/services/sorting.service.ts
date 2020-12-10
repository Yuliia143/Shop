import { Injectable } from '@angular/core';
import { ProductInterface } from '../interfaces/product-interface';
import { SortValueInterface } from '../interfaces/sorting-interfaces';

@Injectable()
export class SortingService {
    private sortValue: SortValueInterface;

    constructor() {
    }

    public handleSortValue(data): void {
        this.sortValue = data;
    }

    public sortProducts(products: ProductInterface[]): ProductInterface[] {
        if (!this.sortValue) {
            return products;
        }
        const value = this.sortValue.sortBy.value;
        if (this.sortValue.sortBy.direction === 'asc') {
            return this.sortByAsc(products, value);
        }
        return this.sortByDesc(products, value);
    }

    private sortByAsc(products: ProductInterface[], value: string): ProductInterface[] {
        return products.sort((a, b) => a[value] - b[value]);
    }

    private sortByDesc(products: ProductInterface[], value: string): ProductInterface[] {
        return products.sort((a, b) => b[value] - a[value]);
    }
}


