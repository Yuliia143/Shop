import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { SearchService } from '@shared/services/search.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    @Output() changeSearchValue = new EventEmitter();
    public searchForm: FormGroup = new FormGroup({
        searchBy: new FormControl('')
    });

    constructor(private searchService: SearchService) {
    }

    ngOnInit(): void {
        this.subscribeToTheFormValueChanges();
    }

    private subscribeToTheFormValueChanges(): void {
        this.searchForm.get('searchBy').valueChanges.pipe(
            distinctUntilChanged()
        ).subscribe(val => {
            this.searchService.handleSearchValue(val);
            this.changeSearchValue.emit();
        });
    }

}
