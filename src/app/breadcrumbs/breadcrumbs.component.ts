import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

interface BreadCrumbInterface {
    label: string;
    url: string;
}

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

    public breadcrumbs: BreadCrumbInterface[];

    constructor(private route: Router) {
    }

    ngOnInit(): void {
        this.route.events.subscribe((data) => {
            if (data instanceof RoutesRecognized) {
                this.breadcrumbs = data.state.root.firstChild.data.breadcrumb;
            }
        });
    }
}
