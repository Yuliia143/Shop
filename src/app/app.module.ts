import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './client/components/header/header.component';
import { BreadcrumbsComponent } from './client/components/breadcrumbs/breadcrumbs.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { CartService } from './client/shared/services/cart.service';
import { SignInComponent } from './client/components/sign-in/sign-in.component';
import { AuthService } from '@shared/services/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from '@shared/guards/auth.guard';
import { WishlistService } from './client/shared/services/wishlist.service';
import { NotificationService } from '@shared/services/notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        SignInComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        MatDialogModule,
        MatSnackBarModule,
        NoopAnimationsModule
    ],
    providers: [CartService, AuthService, AuthGuard, WishlistService, NotificationService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
