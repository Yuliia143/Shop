import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PaginationService {

    constructor() {
    }

    getPager(totalItems, currentPages, pageSize): {} {
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
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        };
    }

}
