import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '@shared/interfaces/product-interface';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@shared/services/cart.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

    public product: ProductInterface;

    constructor(private route: ActivatedRoute, private cartService: CartService) {
    }

    ngOnInit(): void {
        this.initializeProduct();
    }

    private initializeProduct(): void {
        this.route.data.subscribe(data => {
            this.product = data.product;
        });
    }

    public handleAddToCart(product): void {
        this.cartService.addToCart(product);
        window.alert('Your product has been added to the cart!');
    }
}
