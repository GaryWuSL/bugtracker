// import { Injectable } from '@angular/core';
// import {
  // HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

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
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../service/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestForApis = request.url.startsWith(environment.apiUrl);
    const isLoggedIn = this.tokenService.isLoggedIn();

    // Inside intercept'
    // Request is ${JSON.stringify(request.body)}
    if (isLoggedIn && requestForApis) {
      let session = this.tokenService.getSession();
      if (session){
        request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${session.AccessToken}`) });
      }
      
    }
    return next.handle(request);
  }
}
export const AuthInterceptorProvider = { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true };