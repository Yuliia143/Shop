import { Injectable } from '@angular/core';
import { ProductInterface } from '@shared/interfaces/product-interface';
import { Observable, of } from 'rxjs';
import { GoodInterface } from '@shared/interfaces/good-interface';

@Injectable()
export class WishlistService {
    public wishProducts: ProductInterface[] = [];

    constructor() {
        this.initializeWishProducts();
    }

    private initializeWishProducts(): ProductInterface[] {
        const wishProductsFromLs = JSON.parse(localStorage.getItem('wishlist'));
        if (wishProductsFromLs) {
            this.wishProducts = wishProductsFromLs;
        }
        return this.wishProducts;
    }

    isExistInWishlist(product: ProductInterface): ProductInterface {
        return this.wishProducts.find(item => item.id === product.id);
    }

    public addToWishlist(product: ProductInterface): ProductInterface[] {
        const existedProduct = this.isExistInWishlist(product);
        if (!existedProduct) {
            this.wishProducts.push(product);
            localStorage.setItem('wishlist', JSON.stringify(this.wishProducts));
            return this.wishProducts;
        }
    }

    public removeWishProduct(id: number): Observable<ProductInterface[]> {
        this.wishProducts = this.wishProducts.filter(item => item.id !== id);
        localStorage.setItem('wishlist', JSON.stringify(this.wishProducts));
        return of(this.wishProducts);
    }

    public getWishProducts(): Observable<ProductInterface[]> {
        return of(this.wishProducts);
    }

    public getTotalNumberOfWishProducts(): number {
        let totalNumber = 0;
        if (this.wishProducts.length) {
            totalNumber = this.wishProducts.length;
        }
        localStorage.setItem('totalWishProducts', JSON.stringify(totalNumber));
        totalNumber = +localStorage.getItem('totalWishProducts');
        return totalNumber;
    }
}
