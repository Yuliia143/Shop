import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FiltersInterface } from '../interfaces/filters-interface';
import { ProductInterface } from '../interfaces/product-interface';
import { PaginationService } from './pagination.service';

@Injectable()
export class FiltersService {
    // public filters: Observable<FiltersInterface>;
    // private handleFiltersSubject = new Subject<FiltersInterface>();
    //
    // constructor() {
    //     this.filters = this.handleFiltersSubject.asObservable();
    // }
    //
    // public handleFilters(data): void {
    //     this.handleFiltersSubject.next(data); // передача даних
    // }

    private filters: FiltersInterface;
    private handleFiltersSubject = new Subject<FiltersInterface>();

    constructor(private paginationService: PaginationService) {
    }

    public handleFilters(data): void {
        this.handleFiltersSubject.next(data);
        this.handleFiltersSubject.subscribe((filters: FiltersInterface) => {
                this.filters = filters;
            }
        );
        console.log(this.filters, 'this filters');
    }

    public filterProducts(products): ProductInterface[] {
        if (!this.filters) {
            return products;
        }
        return this.filterByCategory(products).filter(product => {
            return this.isExistProductInBrands(product) && this.isExistProductInRating(product) && this.isExistProductInPrice(product);
        });
    }

    private filterByCategory(products: ProductInterface[]): ProductInterface[] {
        return products.filter(product => this.filters.category ?
            this.filters.category === product.category.toLowerCase() : !!product);
    }

    private isExistProductInBrands(product: ProductInterface): boolean {
        return this.filters.brands && this.filters.brands.length !== 0 ?
            this.filters.brands.includes(product.farm.toLowerCase()) : !!product;
    }

    private isExistProductInRating(product: ProductInterface): boolean {
        return this.filters.rating && this.filters.rating.length !== 0 ?
            this.filters.rating.map(elem => +elem).includes(product.rating) : !!product;
    }

    private isExistProductInPrice(product: ProductInterface): boolean {
        const [min, max] = this.filters.price;
        return this.filters.price && this.filters.price.length !== 0 ?
            product.price >= min && product.price <= max : !!product;
    }

}
