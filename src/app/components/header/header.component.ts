import { Component, OnDestroy, OnInit } from '@angular/core';
import { CATEGORIES } from '@mocks/mock-categories';
import { CartService } from '@shared/services/cart.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { AuthService } from '@shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UserInterface } from '@shared/interfaces/user-interface';
import { CategoryInterface } from '@shared/interfaces/category-interface';
import { WishlistService } from '@shared/services/wishlist.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    public objectKeys = Object.keys;
    public categories: CategoryInterface[] = CATEGORIES;
    public user: UserInterface;
    public totalNumberOfGoods: number;
    public totalNumberOfWishProducts: number;
    private unsubscribeAll = new Subject();

    constructor(
        private cartService: CartService,
        private authService: AuthService,
        private wishlistService: WishlistService,
        private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getUser();
        this.getTotalNumberOfWishProducts();
        this.getTotalNumberOfGoods();
    }

    private getUser(): void {
        this.authService.userSubject
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((user: UserInterface) => this.user = user);
    }

    private getTotalNumberOfWishProducts(): void {
        this.wishlistService.totalNumberOfWishProducts
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((totalNumber: number) => this.totalNumberOfWishProducts = totalNumber);
    }

    private getTotalNumberOfGoods(): void {
        this.cartService.totalNumberOfGoods
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((totalNumber: number) => this.totalNumberOfGoods = totalNumber);
    }

    public openDialog(): void {
        this.dialog.open(SignInComponent);
    }

    public signOut(): void {
        this.authService.signOut();
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

}
