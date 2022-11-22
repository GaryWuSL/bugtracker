import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenResponse } from '../message/token-response';
import { ServiceResponse } from '../message/service-response';
import { LoginRequest } from '../message/login-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  readonly APIUrl=environment.apiUrl;
  readonly AttachmentUrl=environment.attachmentUrl;
  constructor(private http:HttpClient) { }

  getTicketList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/ticket');
  }

  getTicket(val:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/ticket/get?ticketid='+val);
  }

  getTicketSummaryByUser():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/ticket/summarybyUser');
  }

  addTicket(val:any):Observable<ServiceResponse>{
    return this.http.post<ServiceResponse>(this.APIUrl+'/ticket',val);
  }

  updateTicket(val:any):Observable<ServiceResponse>{
    return this.http.put<ServiceResponse>(this.APIUrl+'/ticket',val);
  }

  deleteTicket(val:any):Observable<ServiceResponse>{
    return this.http.delete<ServiceResponse>(this.APIUrl+'/ticket/'+val);
  }

  getFollowupList(val:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/followup/get?ticketid='+val);
  }

  addFollowup(val:any):Observable<ServiceResponse>{
    return this.http.post<ServiceResponse>(this.APIUrl+'/followup',val);
  }

  updateFollowup(val:any):Observable<ServiceResponse>{
    return this.http.put<ServiceResponse>(this.APIUrl+'/followup',val);
  }

  deleteFollowup(val:any):Observable<ServiceResponse>{
    return this.http.delete<ServiceResponse>(this.APIUrl+'/followup/'+val);
  }

  getUserList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/user');
  }

  addUser(val:any):Observable<ServiceResponse>{
    return this.http.post<ServiceResponse>(this.APIUrl+'/user',val);
  }

  updateUser(val:any):Observable<ServiceResponse>{
    return this.http.put<ServiceResponse>(this.APIUrl+'/user',val);
  }

  deleteUser(val:any):Observable<ServiceResponse>{
    return this.http.delete<ServiceResponse>(this.APIUrl+'/user/'+val);
  }

  getAllStatusNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/share/Status');
  }
  
  getAllPriorityNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/share/Priority');
  }

  //login(val:any,val2:any): Observable<TokenResponse>{
  //  let params = new HttpParams().set('username', val).set('password', val2);
  //  return this.http.post<TokenResponse>(this.APIUrl+'/Authenticate',{params});
  //}
  
  login(loginRequest: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.APIUrl+'/Authenticate', loginRequest);
  }

  logout(): Observable<TokenResponse> {
    return this.http.get<TokenResponse>(this.APIUrl+'/Authenticate/logout');
  }

  createdb():Observable<ServiceResponse>{
    return this.http.get<ServiceResponse>(this.APIUrl+'/share/createdb');
  }

  dbname():Observable<string>{
    return this.http.get<string>(this.APIUrl+'/share/dbname');
  }

  importdata():Observable<ServiceResponse>{
    return this.http.get<ServiceResponse>(this.APIUrl+'/share/importdata');
  }
  
  uploadfile(val:any):Observable<any[]>{
    return this.http.post<any>(this.APIUrl+'/Attachment/SaveFile',val)
  }

  getStatusColor(statusid:number) {
  switch (statusid) 
    {
      case 1:
          return "bg-danger";
          break;
      case 2:
          return "bg-info";
          break;
      case 3:
          return "bg-primary";
          break;
      case 4:
          return "bg-secondary";
          break;
      case 5:
          return "bg-success";
          break;
      case 6:
          return "bg-warning";
          break;
    } 
    return "bg-dark";
  }
  // refreshToken(session: TokenResponse) {
  //   let refreshTokenRequest: any = {
  //     UserId: session.userId,
  //     RefreshToken: session.refreshToken
  //   };
  //   return this.http.post<TokenResponse>(this.APIUrl+'/RefreshToken`, refreshTokenRequest);
  // }
  
 }

