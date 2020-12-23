import { Component, OnInit } from '@angular/core';
import { WishlistService } from '@shared/services/wishlist.service';
import { ProductInterface } from '@shared/interfaces/product-interface';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
    public wishProducts: ProductInterface[];

    constructor(private wishlistService: WishlistService) {
    }

    ngOnInit(): void {
      this.getWishProducts();
    }

    public getWishProducts(): void {
        this.wishlistService.getWishProducts().subscribe(products => this.wishProducts = products);
    }

}
