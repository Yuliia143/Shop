import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { DeactivateGuard } from '@shared/guards/deactivate.guard';

const routes: Routes = [
    { path: '', component: CheckoutComponent, canDeactivate: [DeactivateGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CheckoutRoutingModule {
}
