import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProductInterface } from '../interfaces/product-interface';
import { ProductsService } from '../services/products.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductsResolver implements Resolve<any> {

    constructor(private productsService: ProductsService) {
    }

    resolve(route: ActivatedRouteSnapshot): Promise<ProductInterface[]> {
        return this.productsService.initProducts();
    }
}
