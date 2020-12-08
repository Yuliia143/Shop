import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../interfaces/product-interface';
import { ActivatedRoute } from '@angular/router';
import { FiltersService } from '../services/filters.service';
import { PaginationService } from '../services/pagination.service';
import { RangeInterface } from '../interfaces/pagination-interfaces';

@Component({
    selector: 'app-main-view',
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

    constructor(private route: ActivatedRoute, private filtersService: FiltersService, private paginationService: PaginationService) {
        // this.filtersService.filters.subscribe((data) => {
        //         this.filters = data;
        //         this.range = this.paginationService.setPage(1, this.filteredProducts);
        //         console.log(this.filters, 'in main view');
        //     }
        // );
    }

    public products: ProductInterface[] = [];

    public productsForPage: ProductInterface[] = [];

    public filters;
    private range: RangeInterface = {
        start: 0,
        end: 9
    };

    ngOnInit(): void {
        this.initializeProducts();
    }

    private initializeProducts(): void {
        this.route.data.subscribe(data => {
            this.products = data.products;
        });
    }

    public handleRange(range): RangeInterface {
        return this.range = range;
    }

    public generateRange(): void {
        this.range = this.paginationService.setPage(1, this.filteredProducts);
    }


    // get filteredProducts(): ProductInterface[] {
    //     if (!this.filters) {
    //         return this.products;
    //     }
    //     return this.filterByCategory(this.products).filter(product => {
    //         return this.isExistProductInBrands(product) && this.isExistProductInRating(product) && this.isExistProductInPrice(product);
    //     });
    // }
    //
    // private filterByCategory(products: ProductInterface[]): ProductInterface[] {
    //     return products.filter(product => this.filters.category ?
    //         this.filters.category === product.category.toLowerCase() : !!product);
    // }
    //
    // private isExistProductInBrands(product: ProductInterface): boolean {
    //     return this.filters.brands && this.filters.brands.length !== 0 ?
    //         this.filters.brands.includes(product.farm.toLowerCase()) : !!product;
    // }
    //
    // private isExistProductInRating(product: ProductInterface): boolean {
    //     return this.filters.rating && this.filters.rating.length !== 0 ?
    //         this.filters.rating.includes(product.rating) : !!product;
    // }
    //
    // private isExistProductInPrice(product: ProductInterface): boolean {
    //     const [min, max] = this.filters.price;
    //     return this.filters.price && this.filters.price.length !== 0 ?
    //         product.price >= min && product.price <= max : !!product;
    // }

    get filteredProducts(): ProductInterface[] {
        return this.filtersService.filterProducts(this.products);
    }

    get filteredAndPaginatedProducts(): ProductInterface[] {
        return this.filteredProducts.slice(this.range.start, this.range.end + 1);
    }
}
