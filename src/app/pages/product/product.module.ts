import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RecommendedProductsComponent } from './recommended-products/recommended-products.component';
import { RecommendedProductCardComponent } from './recommended-products/recommended-product-card/recommended-product-card.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductsModule } from '../products/products.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsComponent,
    RecommendedProductsComponent,
    RecommendedProductCardComponent
  ],
  exports: [
    ProductComponent,
    RecommendedProductsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ProductsModule
  ]
})
export class ProductModule {
}
