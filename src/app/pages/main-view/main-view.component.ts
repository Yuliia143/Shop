import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../shared/interfaces/product-interface';
import { ActivatedRoute } from '@angular/router';
import { FiltersService } from '../../shared/services/filters.service';
import { PaginationService } from '../../shared/services/pagination.service';
import { RangeInterface } from '../../shared/interfaces/pagination-interfaces';
import { SortingService } from '../../shared/services/sorting.service';

@Component({
    selector: 'app-main-view',
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

    constructor(private route: ActivatedRoute, private filtersService: FiltersService,
                private paginationService: PaginationService, private sortingService: SortingService) {
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

    get filteredAndSortedProducts(): ProductInterface[] {
        return this.sortingService.sortProducts(this.filteredProducts);
    }

    get paginatedProducts(): ProductInterface[] {
        return this.filteredAndSortedProducts.slice(this.range.start, this.range.end + 1);
    }

}
