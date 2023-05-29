import {
    HttpHandler,
    HttpInterceptor,
    HttpParams,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap((user) => {
                // Return original request if there are no user
                if (!user) {
                    return next.handle(req);
                }
                // If there is an user, add a token to ongoing requests
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token),
                });
                return next.handle(modifiedReq);
            })
        );
    }

    constructor(private authService: AuthService) {}
}
