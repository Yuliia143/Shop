import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    public user: {};
    public token: string;
    public redirectUrl: string;

    constructor(public afAuth: AngularFireAuth, private router: Router) {
    }

    public googleAuth(): any {
        return this.authLogin(new firebase.auth.GoogleAuthProvider());
    }

    public facebookAuth(): any {
        return this.authLogin(new firebase.auth.FacebookAuthProvider());
    }

    public githubAuth(): any {
        return this.authLogin(new firebase.auth.GithubAuthProvider());
    }

    private authLogin(provider): any {
        return this.afAuth.signInWithPopup(provider)
            .then((result) => {
                const credential = result.credential as firebase.auth.OAuthCredential;
                this.token = credential.accessToken;
                this.user = result.user;
                localStorage.setItem('user', JSON.stringify(this.user));
                localStorage.setItem('token', JSON.stringify(this.token));
                if (this.redirectUrl) {
                    this.router.navigate([this.redirectUrl]);
                    this.redirectUrl = null;
                }
            }).catch((error) => {
                throw new Error(error);
            });
    }

    public signOut(): any {
        return this.afAuth.signOut().then(() => {
            this.router.navigate(['/']);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }).catch((error) => {
            throw new Error(error);
        });
    }

    public getUser(): any {
        this.user = JSON.parse(localStorage.getItem('user'));
        return this.user;
    }
}
