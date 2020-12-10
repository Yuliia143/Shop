import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { SortingService } from '../../services/sorting.service';
import { SORTOPTIONS } from '../../../mock-sortOptions';
import { SortOptionInterface, SortValueInterface } from '../../interfaces/sorting-interfaces';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-sorting',
    templateUrl: './sorting.component.html',
    styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit, OnDestroy {
    @Output() changeSortValue: EventEmitter<SortValueInterface> = new EventEmitter<SortValueInterface>();

    private unsubscribeAll = new Subject();
    public sortOptions: SortOptionInterface[] = SORTOPTIONS;
    public sortingForm: FormGroup = new FormGroup({
        sortBy: new FormControl({})
    });

    constructor(private sortingService: SortingService) {
    }

    ngOnInit(): void {
        this.onChanges();
    }

    private onChanges(): void {
        this.sortingForm.valueChanges.pipe(
            distinctUntilChanged()
        ).subscribe(val => {
            this.sortingService.handleSortValue(val);
            this.changeSortValue.emit();
        });
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

}
