import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";


@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = localStorage.getItem('token')
        req = req.clone({
            setHeaders: {
                Authorization: `${token}`
            }
        });
        return next.handle(req);
    }
}