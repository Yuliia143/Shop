import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutViewComponent } from './checkout-view.component';

const routes: Routes = [
  { path: '', component: CheckoutViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutViewRoutingModule {
}
