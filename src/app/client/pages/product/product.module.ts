import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RecommendedProductsComponent } from './recommended-products/recommended-products.component';
import { RecommendedProductCardComponent } from './recommended-products/recommended-product-card/recommended-product-card.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductsModule } from '../products/products.module';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab/tab.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsComponent,
    RecommendedProductsComponent,
    RecommendedProductCardComponent,
    TabsComponent,
    TabComponent
  ],
  exports: [
    ProductComponent,
    RecommendedProductsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ProductsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule {
}
