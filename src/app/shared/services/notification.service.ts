import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {

    constructor(private snackBar: MatSnackBar) {
    }

    public openSnackBar(message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}
