import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../../client/components/sign-in/sign-in.component';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public authService: AuthService, private dialog: MatDialog) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    public checkLogin(url: string): boolean {
        if (!this.authService.getUser()) {
            this.dialog.open(SignInComponent);
            this.authService.redirectUrl = url;
            return false;
        }
        return true;
    }

}
