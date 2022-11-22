import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-dashboard',
  templateUrl: './list-dashboard.component.html',
  styleUrls: ['./list-dashboard.component.css']
})
export class ListDashboardComponent implements OnInit {

  user = {
    UserId:0,
    UserName:'',
    EmailAddress:'',
    PhotoFilePath:''
  }

  TicketSummary:any=[];
  UserSummary:any=[];
  lastUserName:string="";
  isShowButtons:boolean=false;

  constructor(private service:SharedService, 
    private tokenService:TokenService,
    private router: Router) { 
    let session = this.tokenService.getSession();
    if (session != null) {
      this.user.UserId = session.UserId;
      this.user.UserName = session.UserName;
      this.user.EmailAddress = session.EmailAddress;
      this.user.PhotoFilePath = session.PhotoFilePath;
    } else {
      this.user.UserId = 0;
      this.user.UserName = "";
      this.user.EmailAddress = "";
      this.user.PhotoFilePath = "";
    }
  }

  ngOnInit(): void {
    this.refreshTicketSummaryByUser();
    this.lastUserName="";
  }

  displayUserName(item: any): boolean {
    if (item.AssignUserName !== this.lastUserName) {
      this.lastUserName = item.AssignUserName;
      this.isShowButtons = true;
      return true;
    } else {
      this.isShowButtons = false;
      return false;
    }
  }

  displayUserStatus(AssignUserName:string, CurrentUserName:string): boolean {
    if (AssignUserName == CurrentUserName) {
      return true;
    } else {
      return false;
    }
  }

  trackByUserName(index: number, item: any): string {
    return item.AssignUserName;
  }

  getColor(statusid: number){
    return this.service.getStatusColor(statusid);
  }

  refreshTicketSummaryByUser(){
    this.service.getTicketSummaryByUser().subscribe(data=>{
      this.TicketSummary=data;
    });
  }

  onButtonClick(itemUser:any) {
    this.router.navigateByUrl("/ticket?status="+itemUser.StatusName+"&assignusername="+itemUser.AssignUserName);
  }

 
}
