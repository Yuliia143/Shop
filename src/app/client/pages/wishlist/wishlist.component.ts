import { Component, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../shared/services/wishlist.service';
import { ProductInterface } from '@shared/interfaces/product-interface';
import { UserInterface } from '@shared/interfaces/user-interface';
import { AuthService } from '@shared/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {
    public user: UserInterface;
    public wishProducts: ProductInterface[];
    private unsubscribeAll = new Subject();

    constructor(private wishlistService: WishlistService, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.getUser();
        this.getWishProducts();
    }

    private getUser(): void {
        this.authService.userSubject
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((user: UserInterface) => this.user = user);
    }

    public getWishProducts(): void {
        this.wishlistService.getWishProducts()
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(products => this.wishProducts = products);
    }

    public removeWishProduct(id: number): void {
        this.wishlistService.removeWishProduct(id)
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(products => this.wishProducts = products);
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

}
