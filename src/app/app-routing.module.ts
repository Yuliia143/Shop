import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  // { path: 'main', component: MainViewComponent },
  { path: 'main', loadChildren: () => import('./main-view/main-view.module').then(m => m.MainViewModule) },
  // { path: 'product/:id', component: ProductViewComponent },
  {
    path: 'product/:id',
    loadChildren: () => import('./product-view/product-view.module').then(m => m.ProductViewModule)
  },
  // { path: 'checkout', component: CheckoutViewComponent },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout-view/checkout-view.module').then(m => m.CheckoutViewModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
