import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductInterface } from '../../interfaces/product-interface';
import { PaginationService } from '../../services/pagination.service';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    @Input() products: ProductInterface[];

    @Output() items: EventEmitter<ProductInterface[]> = new EventEmitter<ProductInterface[]>(true);

    public pager;
    private pageSize = 10;

    constructor(private paginationService: PaginationService) {
    }

    ngOnInit(): void {
        this.setPage(1);
    }

    setPage(page): void {
        window.scrollTo(0, 0);
        this.pager = this.paginationService.getPager(this.products.length, [page], this.pageSize);
        this.items.emit(this.products.slice(this.pager.startIndex, this.pager.endIndex + 1));
    }

    showMoreItems(page): void {
        const pages = [...this.pager.currentPages, ++page];
        this.pager = this.paginationService.getPager(this.products.length, pages, this.pageSize);
        this.items.emit(this.products.slice(this.pager.startIndex, this.pager.endIndex + 1));
    }

}
