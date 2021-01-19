import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProductInterface } from '@shared/interfaces/product-interface';
import { ProductsService } from '@shared/services/products.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<ProductInterface> {

    constructor(private productsService: ProductsService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<ProductInterface> {
        return new Observable((observer) => {
            this.productsService.getById(route.params.id)
                .then(data => {
                    if (!data) {
                        alert('Oops, Something Went Wrong');
                        throw new Error('ERROR');
                    }
                    observer.next(data);
                    observer.complete();
                })
                .catch(() => {
                    observer.complete();
                    return of();
                });
        });
    }
}
