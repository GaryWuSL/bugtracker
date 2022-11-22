import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenResponse } from '../message/token-response';
import { Buffer } from 'buffer';
// import { sharedService } from '../service/shared.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveSession(tokenResponse: TokenResponse) {

    window.localStorage.setItem('AT', tokenResponse.AccessToken);
    if (tokenResponse.UserId) {
        window.localStorage.setItem('ID', tokenResponse.UserId.toString());
        window.localStorage.setItem('UN', tokenResponse.UserName);
	      window.localStorage.setItem('UD', tokenResponse.UserDescription);
	      window.localStorage.setItem('EM', tokenResponse.EmailAddress);
        window.localStorage.setItem('PF', tokenResponse.PhotoFilePath);
        window.localStorage.setItem('SU', String(tokenResponse.Success));
        window.localStorage.setItem('EC', tokenResponse.ErrorCode);
        window.localStorage.setItem('ER', tokenResponse.Error);
        
    }

  }

  getSession(): TokenResponse | null {
    if (window.localStorage.getItem('AT')) {
        const tokenResponse: TokenResponse = {
          AccessToken: window.localStorage.getItem('AT') || '',
          UserId: +(window.localStorage.getItem('ID') || 0),
		      UserName: window.localStorage.getItem('UN') || '',
          UserDescription: window.localStorage.getItem('UD') || '',
		      EmailAddress: window.localStorage.getItem('EM') || '',
          PhotoFilePath: window.localStorage.getItem('PF') || '',
          Success: (String(window.localStorage.getItem('SU')).toLowerCase() == 'true') || false,
          ErrorCode: window.localStorage.getItem('EC') || '',
          Error: window.localStorage.getItem('ER') || '',
        };

      return tokenResponse;
    }
    return null;
  }

  logout() {
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    let session = this.getSession();
    if (!session) {
      return false;
    }
    // check if token is expired
    // const jwtToken = JSON.parse(atob(session.accessToken.split('.')[1]));
    // const jwtToken = JSON.parse(window.atob(session.accessToken.split('.')[1]));
    // const jwtToken = JSON.parse(Buffer.from(session.accessToken.split('.')[1],'base64').toString());
    // let jwtToken: string = ;

    // var jwtToken = JSON.parse(window.atob(JSON.stringify(session.accessToken.split('.')[1]))).exp;
    // var tokenExpired = Date.now() > (jwtToken.exp * 1000);
    else 
    {
      // check if token is expired
      const base64String = session.AccessToken.split('.')[1];
      var decodedValue:any; 
      var tokenExpired = true;
      if (base64String != null) 
      {
         decodedValue = JSON.parse(Buffer.from(base64String,'base64').toString('utf8'));
         tokenExpired = Date.now() > (decodedValue.exp * 1000);
      }
      return !tokenExpired;
    }
  }
  
  //refreshToken(session: TokenResponse): Observable<TokenResponse> {
  //  return this.sharedService.refreshToken(session);
  //}
  
}
