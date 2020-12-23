import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from '@shared/interfaces/product-interface';
import { WishlistService } from '@shared/services/wishlist.service';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
    public stars: number[] = [1, 2, 3, 4, 5];

    @Input() product: ProductInterface;

    constructor(private wishlistService: WishlistService) {
    }

    ngOnInit(): void {
    }

    public addToWishList(product: ProductInterface): void {
        this.wishlistService.addToWishlist(product);
    }

}
