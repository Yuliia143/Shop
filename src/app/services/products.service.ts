import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ProductInterface } from '../interfaces/product-interface';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    public products: ProductInterface[] = [];

    constructor(public db: AngularFireDatabase) {
    }

    initProducts(): Promise<ProductInterface[]> {
        return this.db.database.ref('products').once('value').then(snapshot => snapshot.val());
    }

    getById(id): Promise<ProductInterface> {
        return this.db.database.ref(`products/${id}`).once('value').then(snapshot => snapshot.val());
    }

}
