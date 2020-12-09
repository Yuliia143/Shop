import { Injectable } from '@angular/core';
import { RangeInterface } from '../interfaces/pagination-interfaces';
import { ProductInterface } from '../interfaces/product-interface';

@Injectable()
export class PaginationService {

    constructor() {
    }

    public pager;
    private pageSize = 10;

    public getPager(totalItems, currentPages, pageSize): {} {
        const totalPages = Math.ceil(totalItems / pageSize);
        const currentPage = currentPages[currentPages.length - 1];
        const startRangePage = currentPages[0];
        let startPage;
        let endPage;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        const startIndex = (startRangePage - 1) * pageSize;
        const additionalElement = (currentPages[currentPages.length - 1] - 1) * pageSize;
        const endIndex = Math.min(additionalElement + pageSize - 1, totalItems - 1);

        const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        return {
            totalItems,
            currentPages,
            currentPage,
            startRangePage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        };
    }

    public setPage(page: number, products: ProductInterface[]): RangeInterface {
        return this.getRange(products.length, [page]);
    }

    public showMoreItems(page: number, products: ProductInterface[]): RangeInterface {
        const pages = [...this.pager.currentPages, ++page];
        return this.getRange(products.length, pages);
    }

    private getRange(count: number, pages: number[]): RangeInterface {
        this.pager = this.getPager(count, pages, this.pageSize);
        return ({ start: this.pager.startIndex, end: this.pager.endIndex });
    }
}
