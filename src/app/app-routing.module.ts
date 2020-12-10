import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsResolver } from './shared/resolvers/products.resolver';
import { ProductResolver } from './shared/resolvers/product.resolver';

const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    {
        path: 'products', loadChildren: () => import('./pages/main-view/main-view.module').then(m => m.MainViewModule),
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
        loadChildren: () => import('./pages/product-view/product-view.module').then(m => m.ProductViewModule),
        resolve: {
            product: ProductResolver
        },
        data: {
            breadcrumb: [
                { label: 'Home', url: '' },
                { label: 'All products', url: 'products' },
                { label: 'Product name' }
            ]
        }
    },
    {
        path: 'checkout',
        loadChildren: () => import('./pages/checkout-view/checkout-view.module').then(m => m.CheckoutViewModule),
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
