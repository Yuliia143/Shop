import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../shared/services/cart.service';
import { GoodInterface } from '../../shared/interfaces/good-interface';
import { CITIES } from '@mocks/mock-cities';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, startWith, takeUntil } from 'rxjs/operators';
import { ProductInterface } from '@shared/interfaces/product-interface';
import { WishlistService } from '../../shared/services/wishlist.service';
import { NotificationService } from '@shared/services/notification.service';
import { CustomValidators } from './custom.validators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'app-checkout-view',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
    public goods: GoodInterface[];
    public existInWishlist: boolean[];

    public tax = 17;
    public taxSum = 0;
    public subTotalSum: number;
    public totalSum: number;
    public promoPercentages = 5;
    private defaultMeasurementUnit = 'Psc';
    private defaultAddress = 'Boykivska 1';

    public stars: number[] = [1, 2, 3, 4, 5];
    private unsubscribeAll = new Subject();

    public options: string[] = CITIES;
    public filteredOptions: Observable<string[]>;

    public checkoutForm: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        lastName: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
        address: new FormControl(this.defaultAddress),
        city: new FormControl(''),
        country: new FormControl(''),
        zip: new FormControl('', [Validators.required, CustomValidators.minNumberOfDigits]),
        additionalInfo: new FormControl(''),
        promo: new FormControl(''),
        mailing: new FormControl(false, [Validators.requiredTrue]),
        terms: new FormControl(false, [Validators.requiredTrue]),
        goods: new FormArray([], [Validators.required]),
        measurementUnit: new FormControl(this.defaultMeasurementUnit)
    });

    constructor(
        private cartService: CartService,
        private wishlistService: WishlistService,
        private notificationService: NotificationService,
        public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getGoods();
        this.getSum();
        this.getFilteredOptions();
        this.patchGoods();
        this.existInWishlist = this.isExistInWishlist(this.goods);
        this.onChanges();
    }

    public hasUnsavedData(): boolean {
        return this.checkoutForm.dirty;
    }

    private onChanges(): void {
        this.checkoutForm.get('address').valueChanges
            .pipe(debounceTime(400), takeUntil(this.unsubscribeAll))
            .subscribe(selectedValue => {
                const dialogRef = this.dialog.open(ConfirmationDialogComponent);
                dialogRef.componentInstance.confirmMessage = 'Are you sure you want to change address?';
                dialogRef.afterClosed().subscribe(result => {
                    if (!result) {
                        this.checkoutForm.get('address').setValue(this.defaultAddress, { emitEvent: false });
                    } else {
                        this.defaultAddress = selectedValue;
                    }
                });
            });
    }

    public isExistInWishlist(goods: GoodInterface[]): boolean[] {
        const existArray: boolean[] = [];
        goods.forEach(item => {
            existArray.push(this.wishlistService.isExistInWishlist(item.good));
        });
        return existArray;
    }

    public addToWishList(product: ProductInterface): void {
        this.wishlistService.addToWishlist(product);
        this.notificationService.openSnackBar('Your product has been added to the wishlist!', 'Close');
        this.existInWishlist = this.isExistInWishlist(this.goods);
    }

    public removeFromWishList(product: ProductInterface): void {
        this.wishlistService.removeWishProduct(product.id);
        this.notificationService.openSnackBar('Your product has been deleted from the wishlist!', 'Close');
        this.existInWishlist = this.isExistInWishlist(this.goods);
    }

    private patchGoods(): void {
        const goodsFormArray = this.checkoutForm.get('goods') as FormArray;
        goodsFormArray.clear();
        this.goods.forEach(item => {
            goodsFormArray.push(new FormControl({
                count: item.count,
                good: item.good
            }));
        });
    }

    private getFilteredOptions(): void {
        this.filteredOptions = this.checkoutForm.get('city').valueChanges.pipe(
            startWith(''),
            map(value => this.filterOptions(value))
        );
    }

    private filterOptions(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    public getGoods(): void {
        this.cartService.getGoods()
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(goods => this.goods = goods);
    }

    public getSum(): void {
        this.subTotalSum = +this.cartService.getTotalSum(this.goods).toFixed(2);
        this.taxSum = +((this.tax * this.subTotalSum) / 100).toFixed(2);
        this.totalSum = +(this.subTotalSum + (this.tax * this.subTotalSum) / 100).toFixed(2);
    }

    public applyPromo(): void {
        const promo = this.checkoutForm.get('promo') as FormArray;
        if (promo.value) {
            this.totalSum = +(this.totalSum - (this.totalSum * this.promoPercentages / 100)).toFixed(2);
        }
    }

    public removeGood(id: number): void {
        this.cartService.removeGood(id)
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(goods => this.goods = goods);
        this.patchGoods();
        this.getSum();
        this.existInWishlist = this.isExistInWishlist(this.goods);
    }

    public handleCountValue(event: Event, good: GoodInterface): void {
        const target = event.target as HTMLInputElement;
        if (target.valueAsNumber < 1) {
            target.valueAsNumber = 1;
        }
        this.cartService.changeCount(target.valueAsNumber, good);
        this.patchGoods();
        this.getSum();
    }

    public submit(): void {
        if (this.checkoutForm.valid) {
            this.cartService.clearGoods()
                .pipe(takeUntil(this.unsubscribeAll))
                .subscribe(goods => {
                    this.goods = goods;
                    this.notificationService.openSnackBar('Your order is successful', 'Close');
                });
            this.checkoutForm.reset({
                city: '',
                goods: this.patchGoods()
            });
            this.getSum();
            localStorage.removeItem('goods');
        }
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}
