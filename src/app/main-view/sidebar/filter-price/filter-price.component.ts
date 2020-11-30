import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
    selector: 'app-filter-price',
    templateUrl: './filter-price.component.html',
    styleUrls: ['./filter-price.component.scss']
})
export class FilterPriceComponent implements OnInit {
    public minValue = 50;
    public maxValue = 200;
    public options: Options = {
        floor: 0,
        ceil: 250
    };

    constructor() {
    }

    ngOnInit(): void {
    }

}
