import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductInterface } from '@shared/interfaces/product-interface';
import { CartService } from '../../../shared/services/cart.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../../../components/sign-in/sign-in.component';
import { UserInterface } from '@shared/interfaces/user-interface';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { Subject } from 'rxjs';
import { NotificationService } from '@shared/services/notification.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
    @Input() product: ProductInterface;

    public user: UserInterface;
    public existInWishlist: boolean;
    public stars: number[] = [1, 2, 3, 4, 5];
    private defaultMeasurementUnit = 'Psc';
    private unsubscribeAll = new Subject();

    public detailsForm: FormGroup = new FormGroup({
        count: new FormControl(1),
        measurementUnit: new FormControl(this.defaultMeasurementUnit)
    });

    constructor(
        private cartService: CartService,
        private authService: AuthService,
        private wishlistService: WishlistService,
        private notificationService: NotificationService,
        private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getUser();
        this.isExistInWishlist();
    }

    private getUser(): void {
        this.authService.userSubject
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((user: UserInterface) => this.user = user);
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

    public openDialog(): void {
        this.dialog.open(SignInComponent);
    }

    public handleAddToCart(product): void {
        let count = 1;
        if (+this.detailsForm.get('count').value > 1) {
            count = +this.detailsForm.get('count').value;
        }
        this.cartService.addToCart(product, count);
        this.notificationService.openSnackBar('Your product has been added to the cart!', 'Close');
        this.detailsForm.get('count').setValue(1);
    }

    public handleChangeValue(event: Event): void {
        const target = event.target as HTMLInputElement;
        if (target.valueAsNumber < 1) {
            this.detailsForm.get('count').setValue(1);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

}
