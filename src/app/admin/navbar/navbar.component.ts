import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { SearchService } from '../shared/services/search.service';
import { NewProductComponent } from '../new-product/new-product.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    @Output() changeSearchValue = new EventEmitter();
    @Output() newProduct = new EventEmitter();
    public searchForm: FormGroup = new FormGroup({
        searchBy: new FormControl('')
    });
    private unsubscribeAll = new Subject();

    constructor(private searchService: SearchService, public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.subscribeToTheFormValueChanges();
    }

    private subscribeToTheFormValueChanges(): void {
        this.searchForm.get('searchBy').valueChanges.pipe(
            takeUntil(this.unsubscribeAll),
            distinctUntilChanged()
        ).subscribe(val => {
            this.searchService.handleSearchValue(val);
            this.changeSearchValue.emit();
        });
    }

    public openCreationModal(): void {
        this.dialog.open(NewProductComponent, { disableClose: true })
            .afterClosed().subscribe(product => {
            if (product) {
                this.newProduct.emit(product);
            }
        });
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}
