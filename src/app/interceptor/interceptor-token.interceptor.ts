import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorTokenInterceptor implements HttpInterceptor {

  constructor(private _router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const reqCopy = request.clone();
    const token =  localStorage.getItem('token');
    if (token) {
      reqCopy.headers.set('Authorization', 'Bearer ' + token)
    }
    return next.handle(reqCopy).pipe(
      catchError(
          (error) => {
              if (error instanceof HttpErrorResponse && error.status === 401) {
                localStorage.clear();
                this._router.navigateByUrl('/login')
              }
              return throwError(error);
          }
      )
  );;
  }
}
