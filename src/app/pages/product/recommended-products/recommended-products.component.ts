import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from '@shared/interfaces/product-interface';

@Component({
    selector: 'app-recommended-products',
    templateUrl: './recommended-products.component.html',
    styleUrls: ['./recommended-products.component.scss']
})
export class RecommendedProductsComponent implements OnInit {
    @Input() products: ProductInterface[];
    @Input() product: ProductInterface;
    public productsFromCategory: ProductInterface[];
    public recommendedProducts: ProductInterface[];
    private startIndex = 0;
    public endIndex = 4;

    constructor() {
    }

    ngOnInit(): void {
        this.productsFromCategory = this.getFromCurrentCategory();
        this.recommendedProducts = this.getRecommendedProducts();
    }

    private getFromCurrentCategory(): ProductInterface[] {
        return this.products.filter(product =>
            product.id !== this.product.id && product.category === this.product.category
        );
    }

    private getRecommendedProducts(): ProductInterface[] {
        return this.productsFromCategory.slice(this.startIndex, this.endIndex);
    }

    public getNextRecommended(): ProductInterface[] {
        this.startIndex += 4;
        this.endIndex += 4;
        this.recommendedProducts = this.productsFromCategory.slice(this.startIndex, this.endIndex);
        return this.recommendedProducts;
    }

}
