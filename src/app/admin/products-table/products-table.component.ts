import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductInterface } from '@shared/interfaces/product-interface';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-products-table',
    templateUrl: './products-table.component.html',
    styleUrls: ['./products-table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductsTableComponent implements OnInit, AfterViewInit, OnChanges {
    public stars: number[] = [1, 2, 3, 4, 5];
    public displayedColumns: string[] = ['id', 'title', 'category', 'farm', 'price', 'rating'];
    public dataSource;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @Input() products: ProductInterface[];

    constructor() {
    }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<ProductInterface>(this.products);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.products) {
            this.dataSource = new MatTableDataSource<ProductInterface>(this.products);
            this.setDataSource();
        }
    }

    ngAfterViewInit(): void {
        this.setDataSource();
    }

    private setDataSource(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
}
