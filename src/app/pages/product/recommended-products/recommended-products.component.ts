import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '@shared/interfaces/product-interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-recommended-products',
    templateUrl: './recommended-products.component.html',
    styleUrls: ['./recommended-products.component.scss']
})
export class RecommendedProductsComponent implements OnInit {

    public recommendedProducts: ProductInterface[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

    private getRecommendedProducts(): ProductInterface[] {
        return [];
    }

}
