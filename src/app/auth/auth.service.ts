import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

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
    constructor(private http: HttpClient) {}

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
                catchError((errorResponse) => {
                    let errorMessage = 'An unknown error occurred!';
                    if (!errorResponse.error || !errorResponse.error.error) {
                        return throwError(errorMessage);
                    }
                    switch (errorResponse.error.error.message) {
                        case 'EMAIL_EXISTS':
                            errorMessage = 'This email already exists.';
                            break;

                        default:
                            break;
                    }
                    return throwError(errorMessage);
                })
            );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDT0jYJtP7RGjAUTEwjQyTlHpw4AnqQZc',
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        );
    }
}
