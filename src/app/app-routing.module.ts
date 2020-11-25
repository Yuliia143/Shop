import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainViewComponent} from './main-view/main-view.component';
import {ProductViewComponent} from './product-view/product-view.component';
import {CheckoutViewComponent} from './checkout-view/checkout-view.component';

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: MainViewComponent},
  {path: 'product/:id', component: ProductViewComponent},
  {path: 'checkout', component: CheckoutViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
