import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortingComponent } from './sorting/sorting.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductCardComponent } from './products-list/product-card/product-card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationService } from '@shared/services/pagination.service';
import { FiltersService } from '@shared/services/filters.service';
import { SortingService } from '@shared/services/sorting.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        ProductsComponent,
        SortingComponent,
        SidebarComponent,
        ProductsListComponent,
        ProductCardComponent,
        FooterComponent,
        PaginationComponent
    ],
    exports: [
        SortingComponent,
        SidebarComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        ReactiveFormsModule,
        NgxSliderModule,
        MatSidenavModule,
        MatIconModule,
        FormsModule
    ],
    providers: [PaginationService, FiltersService, SortingService],
})
export class ProductsModule {
}
