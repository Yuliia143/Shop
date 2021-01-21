import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckoutComponent } from '../../client/pages/checkout/checkout.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../client/pages/checkout/confirmation-dialog/confirmation-dialog.component';
import { map } from 'rxjs/operators';

@Injectable()
export class DeactivateGuard implements CanDeactivate<CheckoutComponent> {
    constructor(private router: Router, private dialog: MatDialog) {
    }

    public canDeactivate(component: CheckoutComponent): Observable<boolean> | boolean {
        if (component.hasUnsavedData()) {
            const dialogRef = this.dialog.open(ConfirmationDialogComponent);
            dialogRef.componentInstance.confirmMessage = 'Are you sure you want to discard changes?';
            return dialogRef.afterClosed().pipe(
                map(result => result === true)
            );
        } else {
            return true;
        }
    }
}
