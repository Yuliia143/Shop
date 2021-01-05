import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsResolver } from '@shared/resolvers/products.resolver';
import { ProductResolver } from '@shared/resolvers/product.resolver';
import { AuthGuard } from '@shared/guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    {
        path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule),
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
        loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
        resolve: {
            product: ProductResolver,
            products: ProductsResolver
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
        loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule),
        data: {
            breadcrumb: [
                { label: 'Home', url: '' },
                { label: 'Checkout' }
            ]
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'wishlist',
        loadChildren: () => import('./pages/wishlist/wishlist.module').then(m => m.WishlistModule),
        data: {
            breadcrumb: [
                { label: 'Home', url: '' },
                { label: 'Wishlist' }
            ]
        },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
