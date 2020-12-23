import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductInterface } from '@shared/interfaces/product-interface';
import { CartService } from '@shared/services/cart.service';
import { UserInterface } from '@shared/interfaces/user-interface';
import { AuthService } from '@shared/services/auth.service';
import { SignInComponent } from '../../../components/sign-in/sign-in.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-wish-card',
    templateUrl: './wish-card.component.html',
    styleUrls: ['./wish-card.component.scss']
})
export class WishCardComponent implements OnInit {

    @Input() wishProduct: ProductInterface;
    @Output() removeWishProduct: EventEmitter<number> = new EventEmitter();

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

    public handleAddToCart(product: ProductInterface): void {
        this.cartService.addToCart(product);
        window.alert('Your product has been added to the cart!');
    }

    public handleRemoveWishProduct(id: number): void {
        this.removeWishProduct.emit(id);
    }

}
