import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist.component';
import { WishlistRoutingModule } from './wishlist-routing.module';
import { ProductsModule } from '../products/products.module';
import { WishCardComponent } from './wish-card/wish-card.component';

@NgModule({
    declarations: [
        WishlistComponent,
        WishCardComponent
    ],
    exports: [],
    imports: [
        CommonModule,
        WishlistRoutingModule,
        ProductsModule
    ],
})
export class WishlistModule {
}
