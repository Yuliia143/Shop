import { Injectable } from '@angular/core';
import { ProductInterface } from '@shared/interfaces/product-interface';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class WishlistService {
    public wishProducts: ProductInterface[] = [];
    public totalNumberOfWishProducts = new BehaviorSubject(0);

    constructor() {
        this.initializeWishProducts();
    }

    private initializeWishProducts(): ProductInterface[] {
        const wishProductsFromLs = JSON.parse(localStorage.getItem('wishlist'));
        if (wishProductsFromLs) {
            this.wishProducts = wishProductsFromLs;
            this.totalNumberOfWishProducts.next(wishProductsFromLs.length);
        }
        return this.wishProducts;
    }

    public isExistInWishlist(product: ProductInterface): boolean {
        return !!this.wishProducts.find(item => item.id === product.id);
    }

    public addToWishlist(product: ProductInterface): ProductInterface[] {
        const existedProduct = this.isExistInWishlist(product);
        if (!existedProduct) {
            this.wishProducts.push(product);
            localStorage.setItem('wishlist', JSON.stringify(this.wishProducts));
            this.totalNumberOfWishProducts.next(this.wishProducts.length);
            return this.wishProducts;
        }
    }

    public removeWishProduct(id: number): Observable<ProductInterface[]> {
        this.wishProducts = this.wishProducts.filter(item => item.id !== id);
        localStorage.setItem('wishlist', JSON.stringify(this.wishProducts));
        this.totalNumberOfWishProducts.next(this.wishProducts.length);
        return of(this.wishProducts);
    }

    public getWishProducts(): Observable<ProductInterface[]> {
        return of(this.wishProducts);
    }

}
