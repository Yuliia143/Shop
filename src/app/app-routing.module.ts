import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsResolver } from '@shared/resolvers/products.resolver';
import { ProductResolver } from '@shared/resolvers/product.resolver';
import { AuthGuard } from '@shared/guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    {
        path: 'products',
        loadChildren: () => import('./client/pages/products/products.module').then(m => m.ProductsModule),
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
        loadChildren: () => import('./client/pages/product/product.module').then(m => m.ProductModule),
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
        loadChildren: () => import('./client/pages/checkout/checkout.module').then(m => m.CheckoutModule),
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
        loadChildren: () => import('./client/pages/wishlist/wishlist.module').then(m => m.WishlistModule),
        data: {
            breadcrumb: [
                { label: 'Home', url: '' },
                { label: 'Wishlist' }
            ]
        },
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        data: {
            breadcrumb: [
                { label: 'Home', url: '' },
                { label: 'Admin' }
            ],
            isAdmin: true,
        },
        resolve: {
            products: ProductsResolver
        },
        canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
