import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from '@shared/interfaces/product-interface';
import { CartService } from '@shared/services/cart.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../../../components/sign-in/sign-in.component';
import { UserInterface } from '@shared/interfaces/user-interface';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    @Input() product: ProductInterface;
    public stars: number[] = [1, 2, 3, 4, 5];
    private defaultMeasurementUnit = 'Psc';
    public detailsForm: FormGroup = new FormGroup({
        count: new FormControl(1),
        measurementUnit: new FormControl(this.defaultMeasurementUnit)
    });

    constructor(
        private cartService: CartService,
        private authService: AuthService,
        private dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    get user(): UserInterface {
        return this.authService.getUser();
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
        window.alert('Your product has been added to the cart!');
        this.detailsForm.get('count').setValue(1);
    }

    public handleChangeValue(event: Event): void {
        const target = event.target as HTMLInputElement;
        if (target.valueAsNumber < 1) {
            this.detailsForm.get('count').setValue(1);
        }
    }

}
