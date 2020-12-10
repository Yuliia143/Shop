import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductInterface } from '../../../shared/interfaces/product-interface';
import { PaginationService } from '../../../shared/services/pagination.service';
import { PagerInterface, RangeInterface } from '../../../shared/interfaces/pagination-interfaces';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    @Input() products: ProductInterface[];
    @Output() range: EventEmitter<RangeInterface> = new EventEmitter<RangeInterface>(true);

    constructor(private paginationService: PaginationService) {
    }

    ngOnInit(): void {
        this.setPage(1);
    }

    public setPage(page: number, products: ProductInterface[] = this.products): void {
        window.scrollTo(0, 0);
        const range = this.paginationService.getRange(products.length, [page]);
        this.range.emit(range);
    }

    public showMoreItems(page: number): void {
        const range = this.paginationService.showMoreItems(page, this.products);
        this.range.emit(range);
    }

    get pager(): PagerInterface {
        return this.paginationService.pager;
    }

}
