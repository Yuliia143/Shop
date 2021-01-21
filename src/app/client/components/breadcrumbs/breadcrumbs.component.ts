import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { BreadcrumbInterface } from '../../shared/interfaces/breadcrumb-interface';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

    public breadcrumbs: BreadcrumbInterface[];

    constructor(private route: Router) {
    }

    ngOnInit(): void {
        this.subscribeToRouteChanges();
    }

    public subscribeToRouteChanges(): void {
        this.route.events.subscribe((data) => {
            if (data instanceof RoutesRecognized) {
                this.breadcrumbs = data.state.root.firstChild.data.breadcrumb;
            }
        });
    }
}
