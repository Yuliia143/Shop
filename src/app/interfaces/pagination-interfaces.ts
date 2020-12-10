export interface RangeInterface {
    start: number;
    end: number;
}

export interface PagerInterface {
    totalItems: number;
    currentPages: number[];
    currentPage: number;
    startRangePage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: number[];
}
