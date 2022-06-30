import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('token') != null) {
            const cloneReq = req.clone({
                
            });
            return next.handle(cloneReq).pipe(
                tap(
                    (succ: any) => {},
                    (err: any) => {
                        
                    }
                )
            );
        }
        else
            return next.handle(req.clone());
    }
}