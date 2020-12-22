import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from '@shared/interfaces/user-interface';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
    public user: UserInterface;
    public redirectUrl: string;

    constructor(public afAuth: AngularFireAuth, private router: Router) {
    }

    public googleAuth(): Promise<void> {
        return this.authLogin(new firebase.auth.GoogleAuthProvider());
    }

    public facebookAuth(): Promise<void> {
        return this.authLogin(new firebase.auth.FacebookAuthProvider());
    }

    public githubAuth(): Promise<void> {
        return this.authLogin(new firebase.auth.GithubAuthProvider());
    }

    private authLogin(provider: AuthProvider): Promise<void> {
        return this.afAuth.signInWithPopup(provider)
            .then((result: UserCredential) => {
                const credential = result.credential as firebase.auth.OAuthCredential;
                const { displayName, email, photoURL, refreshToken } = result.user;
                const { accessToken } = credential;
                this.user = { displayName, email, photoURL, refreshToken, accessToken };
                localStorage.setItem('user', JSON.stringify(this.user));
                localStorage.setItem('token', JSON.stringify(this.user.accessToken));
                if (this.redirectUrl) {
                    this.router.navigate([this.redirectUrl]);
                    this.redirectUrl = null;
                }
            }).catch((error) => {
                throw new Error(error);
            });
    }

    public signOut(): Promise<void> {
        return this.afAuth.signOut().then(() => {
            this.router.navigate(['/']);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }).catch((error) => {
            throw new Error(error);
        });
    }

    public getUser(): UserInterface {
        this.user = JSON.parse(localStorage.getItem('user'));
        return this.user;
    }
}
