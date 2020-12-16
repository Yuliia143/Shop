import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '@shared/services/cart.service';
import { GoodInterface } from '@shared/interfaces/good-interface';
import { CITIES } from '@mocks/mock-cities';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-checkout-view',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
    public goods: GoodInterface[];

    public tax = 17;
    public taxSum = 0;
    public subTotalSum: number;
    public totalSum: number;
    public promoPercentages = 5;

    public stars: number[] = [1, 2, 3, 4, 5];
    private unsubscribeAll = new Subject();

    public options: string[] = CITIES;
    public filteredOptions: Observable<string[]>;

    public checkoutForm: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        lastName: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
        address: new FormControl(''),
        city: new FormControl(''),
        country: new FormControl(''),
        zip: new FormControl('', [Validators.required]),
        additionalInfo: new FormControl(''),
        promo: new FormControl(''),
        mailing: new FormControl(false, [Validators.requiredTrue]),
        terms: new FormControl(false, [Validators.requiredTrue]),
        goods: new FormArray([], [Validators.required])
    });

    constructor(private cartService: CartService) {
    }

    ngOnInit(): void {
        this.getGoods();
        this.getSum();
        this.getFilteredOptions();
        this.patchGoods();
    }

    private patchGoods(): void {
        const control = this.checkoutForm.get('goods') as FormArray;
        control.clear();
        this.goods.forEach(item => {
            control.push(new FormControl({
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
        this.cartService.getGoods().subscribe(goods => this.goods = goods);
    }

    public getSum(): void {
        this.subTotalSum = +this.cartService.getTotalSum(this.goods).toFixed(2);
        this.taxSum = +((this.tax * this.subTotalSum) / 100).toFixed(2);
        this.totalSum = +(this.subTotalSum + (this.tax * this.subTotalSum) / 100).toFixed(2);
    }

    public applyPromo(): void {
        const control = this.checkoutForm.get('promo') as FormArray;
        if (control.value) {
            this.totalSum = +(this.totalSum - (this.totalSum * this.promoPercentages / 100)).toFixed(2);
        }
    }

    public removeGood(id: number): void {
        this.cartService.removeGood(id).subscribe(goods => this.goods = goods);
        this.patchGoods();
        this.getSum();
    }

    public handleCountValue(event: Event, good: GoodInterface): void {
        const target = event.target as HTMLInputElement;
        if (+target.value < 1) {
            target.value = '1';
        }
        this.cartService.changeCount(+target.value, good);
        this.patchGoods();
        this.getSum();
    }

    public submit(): void {
        if (this.checkoutForm.valid) {
            alert('Your order is successful');
            this.cartService.clearGoods().subscribe(goods => this.goods = goods);
            this.checkoutForm.reset({
                city: '',
                goods: this.patchGoods()
            });
            this.getSum();
            localStorage.removeItem('goods');
            localStorage.removeItem('totalNumbers');
        }
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

}
