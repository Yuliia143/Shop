import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { UserInterface } from '@shared/interfaces/user-interface';
import { AuthService } from '@shared/services/auth.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    public user: UserInterface;
    private unsubscribeAll = new Subject();

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.getUser();

    }

    private getUser(): void {
        this.authService.userSubject
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((user: UserInterface) => this.user = user);
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

}
