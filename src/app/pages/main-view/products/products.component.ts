import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from '../../../shared/interfaces/product-interface';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    @Input() productsForPage: ProductInterface[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
