import { Injectable } from '@angular/core';
import { ProductInterface } from '@shared/interfaces/product-interface';
import { SortValueInterface } from '../interfaces/sorting-interfaces';
import { SortTypeEnum, ValueTypeEnum } from '@mocks/mock-sortOptions';

@Injectable()
export class SortingService {
    private sortValue: SortValueInterface;

    constructor() {
    }

    public handleSortValue(sortValue: SortValueInterface): void {
        this.sortValue = sortValue;
    }

    public sortProducts(products: ProductInterface[]): ProductInterface[] {
        if (!this.sortValue) {
            return products;
        }
        const value: ValueTypeEnum = this.sortValue.sortBy.value;
        if (this.sortValue.sortBy.direction === SortTypeEnum.asc) {
            return this.sortByAsc(products, value);
        }
        return this.sortByDesc(products, value);
    }

    private sortByAsc(products: ProductInterface[], value: ValueTypeEnum): ProductInterface[] {
        return products.sort((a, b) => a[value] - b[value]);
    }

    private sortByDesc(products: ProductInterface[], value: ValueTypeEnum): ProductInterface[] {
        return products.sort((a, b) => b[value] - a[value]);
    }
}


