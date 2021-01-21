import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ProductInterface } from '@shared/interfaces/product-interface';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    public products: ProductInterface[] = [];

    constructor(public db: AngularFireDatabase) {
    }

    public initProducts(): Promise<ProductInterface[]> {
        return this.db.database.ref('products').once('value').then(snapshot => snapshot.val());
    }

    public getById(id): Promise<ProductInterface> {
        return this.db.database.ref(`products/${id}`).once('value').then(snapshot => snapshot.val());
    }

    public addNew(product): void {
        let id: number;
        this.db.database.ref('products').limitToLast(1).once('value').then(snapshot => {
            snapshot.forEach(childSnapshot => {
                id = childSnapshot.val().id + 1;
            });
        }).then(() => {
            product.id = id;
            this.db.database.ref('products').child(`${id}`).push();
            this.db.database.ref('products').child(`${id}`).set(product);
        });
    }

}
