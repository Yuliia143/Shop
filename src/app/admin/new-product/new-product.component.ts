import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '@shared/services/products.service';
import { NotificationService } from '@shared/services/notification.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-new-product',
    templateUrl: './new-product.component.html',
    styleUrls: ['./new-product.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NewProductComponent implements OnInit {
    public imageSrc = '';
    public newProductForm = new FormGroup({
        id: new FormControl(),
        imgUrl: new FormControl(this.imageSrc, Validators.required),
        title: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        farm: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        rating: new FormControl('', [Validators.max(5), Validators.required]),
        country: new FormControl(''),
        freshness: new FormControl(''),
        deliveryArea: new FormControl(''),
        deliveryTime: new FormControl(''),
        stock: new FormControl(''),

        buyProperties: new FormControl(''),
        color: new FormControl(''),
        description: new FormGroup({
            howToCook: new FormControl(''),
            main: new FormControl(''),
            origins: new FormControl(''),
            small: new FormControl(''),
        }),
        previousPrice: new FormControl(''),
        sizes: new FormControl(''),
        tags: new FormControl('')
    });

    constructor(
        private productsService: ProductsService,
        private notificationService: NotificationService,
        public dialogRef: MatDialogRef<NewProductComponent>) {
    }

    ngOnInit(): void {
    }

    public onFileChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.imageSrc = reader.result as string;
            this.newProductForm.patchValue({
                imgUrl: this.imageSrc
            });
        };
        reader.readAsDataURL(file);
    }

    public addNewProduct(): void {
        if (this.newProductForm.valid) {
            this.productsService.addNew(this.newProductForm.value);
            this.notificationService.openSnackBar('Your product has been added to the list!', 'Close');
            this.dialogRef.close(this.newProductForm.value);
        }
    }

}
