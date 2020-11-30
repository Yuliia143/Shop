import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-filter-rating',
    templateUrl: './filter-rating.component.html',
    styleUrls: ['./filter-rating.component.scss']
})
export class FilterRatingComponent implements OnInit {
    public stars: number[] = [5, 4, 3, 2, 1];

    constructor() {
    }

    ngOnInit(): void {
    }

}
