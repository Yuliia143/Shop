import { Component, OnInit } from '@angular/core';
import { CATEGORIES } from '@mocks/mock-categories';
import { CartService } from '@shared/services/cart.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { AuthService } from '@shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UserInterface } from '@shared/interfaces/user-interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public categories: {}[] = CATEGORIES;

    constructor(private cartService: CartService,
                public authService: AuthService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    get totalNumberOfGoods(): number {
        return this.cartService.getTotalNumberOfGoods();
    }

    get user(): UserInterface {
        return this.authService.getUser();
    }

    public openDialog(): void {
        this.dialog.open(SignInComponent);
    }

    public signOut(): void {
        this.authService.signOut();
    }

}
