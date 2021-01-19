import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from '@shared/interfaces/product-interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-product-view',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
    public products: ProductInterface[];
    public product: ProductInterface;
    private unsubscribeAll = new Subject();

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.initializeProducts();
        this.initializeProduct();
        this.setBreadCrumbName();
    }

    private initializeProduct(): void {
        this.route.data.pipe(takeUntil(this.unsubscribeAll)).subscribe(data => {
            this.product = data.product;
        });
    }

    private initializeProducts(): void {
        this.route.data.pipe(takeUntil(this.unsubscribeAll)).subscribe(data => {
            this.products = data.products;
        });
    }

    private setBreadCrumbName(): void {
        this.route.data.pipe(takeUntil(this.unsubscribeAll)).subscribe(data => {
            data.breadcrumb[data.breadcrumb.length - 1].label = this.product.title;
        });
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}
