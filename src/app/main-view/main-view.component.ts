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
    }

    public products: ProductInterface[] = [];
    public productsForPage: ProductInterface[] = [];
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

    public handleRange(range: RangeInterface): RangeInterface {
        return this.range = range;
    }

    public generateRange(): void {
        this.range = this.paginationService.getRange(this.filteredProducts.length, [1]);
    }

    get filteredProducts(): ProductInterface[] {
        return this.filtersService.filterProducts(this.products);
    }

    get filteredAndPaginatedProducts(): ProductInterface[] {
        return this.filteredProducts.slice(this.range.start, this.range.end + 1);
    }
}
