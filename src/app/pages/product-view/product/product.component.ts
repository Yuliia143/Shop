import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../../shared/interfaces/product-interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product',
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
