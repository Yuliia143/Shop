import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeactivateGuard } from '@shared/guards/deactivate.guard';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    declarations: [
        CheckoutComponent,
        ConfirmationDialogComponent
    ],
    exports: [],
    imports: [
        CommonModule,
        CheckoutRoutingModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(options),
        FormsModule,
        MatAutocompleteModule,
        MatDialogModule
    ],
    providers: [DeactivateGuard]
})
export class CheckoutModule {
}
