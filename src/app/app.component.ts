import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { UserInterface } from '@shared/interfaces/user-interface';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '@shared/services/auth.service';

declare let chat;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private unsubscribeAll = new Subject();
    private user: UserInterface;
    public title = 'Shop';

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.authService.userSubject
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((user: UserInterface) => this.user = user);
        if (this.user) {
            chat.init({ name: this.user.displayName });
        }
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}
