import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortingComponent } from './sorting/sorting.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { FooterComponent } from '../footer/footer.component';
import { MainViewRoutingModule } from './main-view-routing.module';
import { MainViewComponent } from './main-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationService } from '../services/pagination.service';
import { FiltersService } from '../services/filters.service';

@NgModule({
    declarations: [
        MainViewComponent,
        SortingComponent,
        SidebarComponent,
        ProductsComponent,
        ProductCardComponent,
        FooterComponent,
        PaginationComponent
    ],
    exports: [
        SortingComponent,
        SidebarComponent,
        ProductsComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        MainViewRoutingModule,
        ReactiveFormsModule,
        NgxSliderModule,
        FormsModule
    ],
    providers: [PaginationService, FiltersService],
})
export class MainViewModule {
}
