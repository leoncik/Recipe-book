import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient, private router: Router) {}

    user = new BehaviorSubject<User | any>(null);
    private tokenExpirationTimer: any;

    register(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDT0jYJtP7RGjAUTEwjQyTlHpw4AnqQZc',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            )
            .pipe(
                catchError(this.handleError),
                tap((responseData) => {
                    this.handleAuthentication(
                        responseData.email,
                        responseData.localId,
                        responseData.idToken,
                        +responseData.expiresIn
                    );
                })
            );
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDT0jYJtP7RGjAUTEwjQyTlHpw4AnqQZc',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            )
            .pipe(
                catchError(this.handleError),
                tap((responseData) => {
                    this.handleAuthentication(
                        responseData.email,
                        responseData.localId,
                        responseData.idToken,
                        +responseData.expiresIn
                    );
                })
            );
    }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
    ) {
        // The * 1000 is used to convert time in milliseconds
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        // 'expiresIn' is in seconds and autoLogout expects milliseconds.
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }
        switch (errorResponse.error.error.message) {
            // ! Note: for security reason, displaying less precise error
            // ! messages is more secure. Here we handle different messages
            // ! to practice error handling.

            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists.';
                break;

            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exists.';
                break;

            case 'INVALID_PASSWORD':
                errorMessage = 'Your password is invalid.';
                break;

            default:
                break;
        }
        return throwError(errorMessage);
    }

    autoLogin() {
        const userDataString = localStorage.getItem('userData');
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: Date;
        } = userDataString ? JSON.parse(userDataString) : null;
        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration =
                new Date(userData._tokenExpirationDate).getTime() -
                new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }
}
