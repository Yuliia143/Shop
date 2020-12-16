import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from '@shared/interfaces/product-interface';

@Component({
    selector: 'app-product-view',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    public product: ProductInterface;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.initializeProduct();
    }

    private initializeProduct(): void {
        this.route.data.subscribe(data => {
            this.product = data.product;
        });
    }
}
