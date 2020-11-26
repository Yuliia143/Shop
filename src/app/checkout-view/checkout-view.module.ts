import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingInfoComponent } from './billing-info/billing-info.component';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderCardComponent } from './order-summary/order-card/order-card.component';
import { CheckoutViewRoutingModule } from './checkout-view-routing.module';
import { CheckoutViewComponent } from './checkout-view.component';


@NgModule({
  declarations: [
    CheckoutViewComponent,
    BillingInfoComponent,
    AdditionalInfoComponent,
    ConfirmationComponent,
    OrderSummaryComponent,
    OrderCardComponent
  ],
  exports: [
    BillingInfoComponent,
    AdditionalInfoComponent,
    ConfirmationComponent,
    OrderSummaryComponent
  ],
  imports: [
    CommonModule,
    CheckoutViewRoutingModule
  ]
})
export class CheckoutViewModule {
}
