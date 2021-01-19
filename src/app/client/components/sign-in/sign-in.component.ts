import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

    constructor(public authService: AuthService, private dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    onNoClick(): void {
        this.dialog.closeAll();
    }

    public googleAuth(): void {
        this.authService.googleAuth().then(() => {
            this.onNoClick();
        });
    }

    public facebookAuth(): void {
        this.authService.facebookAuth().then(() => {
            this.onNoClick();
        });
    }

    public githubAuth(): void {
        this.authService.githubAuth().then(() => {
            this.onNoClick();
        });
    }

}
