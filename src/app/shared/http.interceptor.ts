import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpHeaders } from '@angular/common/http';
import { UsersService } from './users/users.service';
import { exhaustMap, take } from 'rxjs/operators';




@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: UsersService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                else {
                    const modifiedReq = req.clone({
                        //##### Adding heading in all requests if user is signed in #####
                        setHeaders: { Authorization: 'Bearer ' + user.token }
                    })
                    return next.handle(modifiedReq);


                }
            })
        )

    }


}