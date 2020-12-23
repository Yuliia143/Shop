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

    get existInWishlist(): ProductInterface {
        return this.wishlistService.isExistInWishlist(this.product);
    }

    public addToWishList(product: ProductInterface): void {
        this.wishlistService.addToWishlist(product);
        window.alert('Your product has been added to the wishlist!');
    }

    public removeFromWishList(id: number): void {
        this.wishlistService.removeWishProduct(id);
        window.alert('Your product has been deleted from the wishlist!');
    }

}
