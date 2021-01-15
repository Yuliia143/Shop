import { Injectable } from '@angular/core';
import { ProductInterface } from '../interfaces/product-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SearchService {
    private searchValue;
    public searchedProducts = new BehaviorSubject([]);
    private keysForSearch = ['id', 'title', 'category', 'farm', 'price', 'rating'];

    constructor() {
    }

    public handleSearchValue(searchValue: string): void {
        this.searchValue = searchValue;
    }

    public searchProducts(products: ProductInterface[]): void {
        if (!this.searchValue) {
            this.searchedProducts.next(products);
        } else {
            const result = products.filter(product => {
                return this.keysForSearch.some(key => {
                    return product[key].toString().toLowerCase().includes(this.searchValue.toLowerCase());
                });
            });
            this.searchedProducts.next(result);
        }
    }
}


