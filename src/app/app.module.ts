import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { CartService } from '@shared/services/cart.service';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthService } from '@shared/services/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from '@shared/guards/auth.guard';
import { WishlistService } from '@shared/services/wishlist.service';


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
        NoopAnimationsModule
    ],
    providers: [CartService, AuthService, AuthGuard, WishlistService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
