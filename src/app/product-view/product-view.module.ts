import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './product/product.component';
import { RecommendedProductsComponent } from './recommended-products/recommended-products.component';
import { RecommendedProductCardComponent } from './recommended-products/recommended-product-card/recommended-product-card.component';
import { ProductViewRoutingModule } from './product-view-routing.module';

@NgModule({
  declarations: [
    ProductComponent,
    RecommendedProductsComponent,
    RecommendedProductCardComponent
  ],
  exports: [
    ProductComponent,
    RecommendedProductsComponent
  ],
  imports: [
    CommonModule,
    ProductViewRoutingModule
  ]
})
export class ProductViewModule {
}
