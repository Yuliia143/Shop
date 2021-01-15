import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductInterface } from '@shared/interfaces/product-interface';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '@shared/services/search.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
    public products: ProductInterface[] = [];
    public searchedProducts: ProductInterface[] = [];
    public searchProducts: ProductInterface[] = [];
    private unsubscribeAll = new Subject();

    constructor(private route: ActivatedRoute, private searchService: SearchService) {
    }

    ngOnInit(): void {
        this.initializeProducts();
    }

    private initializeProducts(): void {
        this.route.data.subscribe(data => {
            this.products = data.products;
            this.searchedProducts = this.products;
        });
    }

    public handleSearchValue(): void {
        this.searchService.searchProducts(this.products);

        this.searchService.searchedProducts
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((searchedProducts) => {
                this.searchedProducts = searchedProducts;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}
