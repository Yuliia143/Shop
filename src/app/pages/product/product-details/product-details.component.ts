import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '@shared/interfaces/product-interface';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@shared/services/cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    public product: ProductInterface;
    public stars: number[] = [1, 2, 3, 4, 5];
    public detailsForm: FormGroup = new FormGroup({
        count: new FormControl(1),
        property: new FormControl('Psc')
    });

    constructor(private route: ActivatedRoute, private cartService: CartService) {
    }

    ngOnInit(): void {
        this.initializeProduct();
    }

    private initializeProduct(): void {
        this.route.data.subscribe(data => {
            this.product = data.product;
        });
    }

    public handleAddToCart(product): void {
        let count = 1;
        if (+this.detailsForm.get('count').value > 1){
            count = +this.detailsForm.get('count').value;
        }
        this.cartService.addToCart(product, count);
        window.alert('Your product has been added to the cart!');
    }

    public handleChangeValue(event: Event): void {
        const target = event.target as HTMLInputElement;
        if (+target.value < 1) {
            this.detailsForm.get('count').setValue(1);
        }
    }

}
