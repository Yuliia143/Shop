import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from '@shared/interfaces/product-interface';
import { WishlistService } from '../../../../shared/services/wishlist.service';
import { NotificationService } from '@shared/services/notification.service';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
    public stars: number[] = [1, 2, 3, 4, 5];
    public existInWishlist: boolean;

    @Input() product: ProductInterface;

    constructor(private wishlistService: WishlistService, private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.isExistInWishlist();
    }

    private isExistInWishlist(): void {
        this.existInWishlist = this.wishlistService.isExistInWishlist(this.product);
    }

    public addToWishList(product: ProductInterface): void {
        this.wishlistService.addToWishlist(product);
        this.notificationService.openSnackBar('Your product has been added to the wishlist!', 'Close');
        this.existInWishlist = !this.existInWishlist;
    }

    public removeFromWishList(id: number): void {
        this.wishlistService.removeWishProduct(id);
        this.notificationService.openSnackBar('Your product has been deleted from the wishlist!', 'Close');
        this.existInWishlist = !this.existInWishlist;
    }

}
