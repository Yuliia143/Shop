import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortingComponent } from './sorting/sorting.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FilterCategoriesComponent } from './sidebar/filter-categories/filter-categories.component';
import { FilterBrandsComponent } from './sidebar/filter-brands/filter-brands.component';
import { FilterRatingComponent } from './sidebar/filter-rating/filter-rating.component';
import { FilterPriceComponent } from './sidebar/filter-price/filter-price.component';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { FooterComponent } from '../footer/footer.component';
import { MainViewRoutingModule } from './main-view-routing.module';
import { MainViewComponent } from './main-view.component';

@NgModule({
    declarations: [
        MainViewComponent,
        SortingComponent,
        SidebarComponent,
        FilterCategoriesComponent,
        FilterBrandsComponent,
        FilterRatingComponent,
        FilterPriceComponent,
        ProductsComponent,
        ProductCardComponent,
        FooterComponent
    ],
    exports: [
        SortingComponent,
        SidebarComponent,
        ProductsComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        MainViewRoutingModule
    ]
})
export class MainViewModule {
}
