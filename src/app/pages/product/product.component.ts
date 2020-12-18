import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from '@shared/interfaces/product-interface';

@Component({
    selector: 'app-product-view',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    public products: ProductInterface[];
    public product: ProductInterface;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.initializeProducts();
        this.initializeProduct();
        this.setBreadCrumbName();
    }

    private initializeProduct(): void {
        this.route.data.subscribe(data => {
            this.product = data.product;
        });
    }

    private initializeProducts(): void {
        this.route.data.subscribe(data => {
            this.products = data.products;
        });
    }

    private setBreadCrumbName(): void {
        this.route.data.subscribe(data => {
            data.breadcrumb[data.breadcrumb.length - 1].label = this.product.title;
        });
    }
}
