// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {

//   constructor() {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return next.handle(request);
//   }
// }

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { ErrorResponse } from '../message/error-response';
import { TokenService } from '../service/token.service';
import { SharedService } from '../service/shared.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  constructor(private tokenService: TokenService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        tap(response => console.log(JSON.stringify(response))),
        catchError((error: HttpErrorResponse) => {

          console.log(JSON.stringify(error));
          let session = this.tokenService.getSession();
          if (error.status === 400 && error.error.errorCode === 'invalid_grant') {
            // The refresh token has expired, the user must login again
            this.tokenService.logout();
            this.router.navigate(['login']);
          } else {
            let errorResponse: ErrorResponse = error.error;
            // JSON.stringify(errorResponse)
            return throwError(() => errorResponse);
          }

          return EMPTY;
        })
      );
  }
}
export const ErrorInterceptorProvider = { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true };
