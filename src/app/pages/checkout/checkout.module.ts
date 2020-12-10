import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingInfoComponent } from './billing-info/billing-info.component';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderCardComponent } from './order-summary/order-card/order-card.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';

@NgModule({
  declarations: [
    CheckoutComponent,
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
    CheckoutRoutingModule
  ]
})
export class CheckoutModule {
}
