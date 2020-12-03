import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../interfaces/product-interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-main-view',
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
    public products: ProductInterface[] = [];

    public productsForPage: ProductInterface[] = [];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.products = data.products;
        });
    }

    handleProductsForPage(items): ProductInterface[] {
        return this.productsForPage = items;
    }
}
