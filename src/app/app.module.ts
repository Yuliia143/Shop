import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { MainViewComponent } from './main-view/main-view.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { CheckoutViewComponent } from './checkout-view/checkout-view.component';
import { MainViewModule } from './main-view/main-view.module';
import { ProductViewModule } from "./product-view/product-view.module";
import { CheckoutViewModule } from "./checkout-view/checkout-view.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    MainViewComponent,
    ProductViewComponent,
    CheckoutViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainViewModule,
    ProductViewModule,
    CheckoutViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
