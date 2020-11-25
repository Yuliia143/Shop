import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {MainViewComponent} from './main-view/main-view.component';
import {SortingComponent} from './main-view/sorting/sorting.component';
import {SidebarComponent} from './main-view/sidebar/sidebar.component';
import {FilterCategoriesComponent} from './main-view/sidebar/filter-categories/filter-categories.component';
import {FilterBrandsComponent} from './main-view/sidebar/filter-brands/filter-brands.component';
import {FilterRatingComponent} from './main-view/sidebar/filter-rating/filter-rating.component';
import {FilterPriceComponent} from './main-view/sidebar/filter-price/filter-price.component';
import {ProductsComponent} from './main-view/products/products.component';
import {ProductCardComponent} from './main-view/products/product-card/product-card.component';
import {FooterComponent} from './footer/footer.component';
import {ProductViewComponent} from './product-view/product-view.component';
import {ProductComponent} from './product-view/product/product.component';
import {RecommendedProductsComponent} from './product-view/recommended-products/recommended-products.component';
import {CheckoutViewComponent} from './checkout-view/checkout-view.component';
import {BillingInfoComponent} from './checkout-view/billing-info/billing-info.component';
import {AdditionalInfoComponent} from './checkout-view/additional-info/additional-info.component';
import {ConfirmationComponent} from './checkout-view/confirmation/confirmation.component';
import {OrderSummaryComponent} from './checkout-view/order-summary/order-summary.component';
import { RecommendedProductCardComponent } from './product-view/recommended-products/recommended-product-card/recommended-product-card.component';
import { OrderCardComponent } from './checkout-view/order-summary/order-card/order-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    MainViewComponent,
    SortingComponent,
    SidebarComponent,
    FilterCategoriesComponent,
    FilterBrandsComponent,
    FilterRatingComponent,
    FilterPriceComponent,
    ProductsComponent,
    ProductCardComponent,
    FooterComponent,
    ProductViewComponent,
    ProductComponent,
    RecommendedProductsComponent,
    CheckoutViewComponent,
    BillingInfoComponent,
    AdditionalInfoComponent,
    ConfirmationComponent,
    OrderSummaryComponent,
    RecommendedProductCardComponent,
    OrderCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
