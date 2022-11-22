// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }
  
// }

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
// import { ErrorResponse } from '../message/error-response';
// import { TokenResponse } from '../message/token-response';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private tokenService: TokenService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let session = this.tokenService.getSession();
    if (session == null) {
      this.router.navigate(['/login']);
      return false;
    }

    if (this.tokenService.isLoggedIn()) {
      this.tokenService.saveSession(session);
    //  console.log(`session is expired, let's renew the tokens`);
    //  // refresh token
    //  return this.checkSession(session);
    }
    return true;
  }

  // checkSession(session: TokenResponse): Observable<boolean> {
  //   return this.tokenService.refreshToken(session).pipe(
  //     map(data => {
  //       // refresh Token repsonse is ${JSON.stringify(data)}
  //       this.tokenService.saveSession(data);
  //       return true;
  //     }),
  //     catchError((error: ErrorResponse) => {
  //       // inside checkSession ${JSON.stringify(error)}
  //       this.router.navigate(['/login']);
  //       return EMPTY;
  //     })
  //   );
  // }

}