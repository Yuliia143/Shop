import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
    @Input() title: string;
    @Input() active = false;
    @Input() count = 0;

    constructor() {
    }

    ngOnInit(): void {
    }

}
