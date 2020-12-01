import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsResolver } from './resolvers/products.resolver';
import { ProductResolver } from './resolvers/product.resolver';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home', loadChildren: () => import('./main-view/main-view.module').then(m => m.MainViewModule),
        resolve: {
            products: ProductsResolver
        },
        data: {
            breadcrumb: [
                { label: 'Home', url: '' },
                { label: 'All products' }
            ]
        },
    },
    {
        path: 'products/:id',
        loadChildren: () => import('./product-view/product-view.module').then(m => m.ProductViewModule),
        resolve: {
            product: ProductResolver
        },
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
