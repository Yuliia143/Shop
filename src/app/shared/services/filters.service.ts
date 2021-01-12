import { Injectable } from '@angular/core';
import { FiltersInterface } from '../interfaces/filters-interface';
import { ProductInterface } from '../interfaces/product-interface';

@Injectable()
export class FiltersService {
    private filters: FiltersInterface;

    constructor() {
    }

    public handleFilters(data): void {
        this.filters = data;
    }

    public filterProducts(products: ProductInterface[]): ProductInterface[] {
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
        return this.filters.brands?.length ?
            this.filters.brands.includes(product.farm.toLowerCase()) : !!product;
    }

    private isExistProductInRating(product: ProductInterface): boolean {
        return this.filters.rating?.length ?
            this.filters.rating.includes(product.rating) : !!product;
    }

    private isExistProductInPrice(product: ProductInterface): boolean {
        const [min, max] = this.filters.price;
        return this.filters.price?.length ?
            product.price >= min && product.price <= max : !!product;
    }

    public resetFilters(): void{
        this.filters = null;
    }

}
