import { Component, OnInit } from '@angular/core';
import { CATEGORIES } from '@mocks/mock-categories';
import { CartService } from '@shared/services/cart.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    categories: {}[] = CATEGORIES;

    constructor(private cartService: CartService) {
    }

    ngOnInit(): void {
    }

    get totalNumberOfGoods(): number {
        return this.cartService.getTotalNumberOfGoods();
    }

}
