import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home', loadChildren: () => import('./main-view/main-view.module').then(m => m.MainViewModule),
        data: {
            breadcrumb: [
                { label: 'Home', url: '' },
                { label: 'All products' }
            ]
        },
    },
    {
        path: 'product/:id',
        loadChildren: () => import('./product-view/product-view.module').then(m => m.ProductViewModule),
        data: {
            breadcrumb: [
                { label: 'Home', url: '' },
                { label: 'All products', url: 'home' },
                { label: 'Product name' }
            ]
        }
    },
    {
        path: 'checkout',
        loadChildren: () => import('./checkout-view/checkout-view.module').then(m => m.CheckoutViewModule),
        data: {
            breadcrumb: [
                { label: 'Home', url: '' },
                { label: 'Checkout' }
            ]
        },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
