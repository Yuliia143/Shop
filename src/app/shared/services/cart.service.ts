import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GoodInterface } from '@shared/interfaces/good-interface';
import { ProductInterface } from '@shared/interfaces/product-interface';

@Injectable()
export class CartService {
    public goods: GoodInterface[] = [];

    constructor() {
        this.initializeGoods();
    }

    private initializeGoods(): GoodInterface[] {
        const goodsFromLs = JSON.parse(localStorage.getItem('goods'));
        if (goodsFromLs) {
            this.goods = goodsFromLs;
        }
        return this.goods;
    }

    private isExistGoodInCart(good: ProductInterface): GoodInterface {
        return this.goods.find(item => item.good.id === good.id);
    }

    public addToCart(good: ProductInterface, count: number = 1): GoodInterface[] {
        const existedGood = this.isExistGoodInCart(good);
        if (!existedGood) {
            this.goods.unshift({ good, count });
            localStorage.setItem('goods', JSON.stringify(this.goods));
            return this.goods;
        }
        count > 1 ? existedGood.count += count : existedGood.count += 1;
        localStorage.setItem('goods', JSON.stringify(this.goods));
    }

    public getGoods(): Observable<GoodInterface[]> {
        return of(this.goods);
    }

    public removeGood(id: number): Observable<GoodInterface[]> {
        this.goods = this.goods.filter(item => item.good.id !== id);
        localStorage.setItem('goods', JSON.stringify(this.goods));
        return of(this.goods);
    }

    public getTotalSum(goods: GoodInterface[]): number {
        return goods.reduce((acc, item) => {
            return acc + item.good.price * item.count;
        }, 0);
    }

    public changeCount(count: number, ware: GoodInterface): Observable<GoodInterface[]> {
        this.goods = this.goods.map(item => {
            if (item.good.id === ware.good.id) {
                item.count = count;
            }
            return item;
        });
        localStorage.setItem('goods', JSON.stringify(this.goods));
        return of(this.goods);
    }

    public getTotalNumberOfGoods(): number {
        let totalNumber = 0;
        if (this.goods.length) {
            this.goods.forEach(item => totalNumber += item.count);
        }
        localStorage.setItem('totalNumbers', JSON.stringify(totalNumber));
        totalNumber = +localStorage.getItem('totalNumbers');
        return totalNumber;
    }

    public clearGoods(): Observable<GoodInterface[]> {
        this.goods = [];
        return of(this.goods);
    }
}
