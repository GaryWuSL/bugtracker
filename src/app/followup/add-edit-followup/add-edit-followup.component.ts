import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService } from 'src/app/service/shared.service';
import { TicketRequest } from 'src/app/message/ticket-request';
import { FollowupRequest } from 'src/app/message/followup-request';
import { TokenService } from 'src/app/service/token.service';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-add-edit-followup',
  templateUrl: './add-edit-followup.component.html',
  styleUrls: ['./add-edit-followup.component.css']
})
export class AddEditFollowupComponent implements OnInit {

  @Input() followup:any;

  followupRequest: FollowupRequest = {
    FollowupId: 0,
    TicketId: 0,
    Title: "",
    FullDescription: "",
    PriorityId: 0,
    StatusId: 0,
    AssignUserId: 0,
    CreateUserId: 0,
    UpdateUserId: 0,
    CreateDate: new Date(),
    UpdateDate: new Date()
  };
  StatusList:any;
  PriorityList:any;
  UserList:any;
  isSuccessful: boolean = false;
  isSaveFailed: boolean = false;
  uploadfile: File;
  errorMessage: string = '';

  constructor(private service:SharedService, private tokenService:TokenService) { }

  ngOnInit(): void {
    let session = this.tokenService.getSession();

    if ((this.followup != null) && (this.followup.FollowupId > 0))
    {
      this.followupRequest.FollowupId = this.followup.FollowupId;
      this.followupRequest.TicketId = this.followup.TicketId;
      this.followupRequest.Title = this.followup.Title;
      this.followupRequest.FullDescription = this.followup.FullDescription;
      this.followupRequest.PriorityId = this.followup.PriorityId;
      this.followupRequest.StatusId = this.followup.StatusId;
      this.followupRequest.AssignUserId = this.followup.AssignUserId;
      this.followupRequest.CreateUserId =this.followup.CreateUserId;
      if ((session != null) && (session.UserId > 0))
      {
        this.followupRequest.UpdateUserId = session.UserId;
      } else {
        this.followupRequest.UpdateUserId = this.followup.UpdateUserId;
      }
    } else {
      if ((session != null) && (session.UserId > 0))
      {
        this.followupRequest.AssignUserId = session.UserId;
        this.followupRequest.CreateUserId = session.UserId;
        this.followupRequest.UpdateUserId = session.UserId;
      }
      this.followupRequest.TicketId = this.followup.TicketId;
      this.followupRequest.Title = this.followup.Title;
      this.followupRequest.PriorityId = this.followup.PriorityId;
      this.followupRequest.StatusId = this.followup.StatusId;
      this.followupRequest.AssignUserId = this.followup.AssignUserId;
    }
    this.service.getAllStatusNames().subscribe((data:any)=>{
      this.StatusList=data;
    });
    this.service.getAllPriorityNames().subscribe((data:any)=>{
      this.PriorityList=data;
    });
    this.service.getUserList().subscribe((data:any)=>{
      this.UserList=data;
    });
  }

  onSubmit(ngFollowup:NgForm) {
    
    if (!(ngFollowup.valid)) {
       return;
     }
     
     this.UpdateFollowup(this.followupRequest);    

     // this.isSaveFailed = true;
     
   }

   UpdateFollowup(followupRequest: FollowupRequest)
  {
    if (followupRequest.FollowupId == 0)
    {
      this.service.addFollowup(followupRequest).subscribe(res=>{
        if (res.Success == false)
        {
          this.isSaveFailed = true;
          this.errorMessage = res.Error;
        } else {
          // this.ngbModal.dismissAll();
          window.location.reload();
        }
      });
    } else {
      this.service.updateFollowup(followupRequest).subscribe(res=>{
        if (res.Success == false)
          {
            this.isSaveFailed = true;
            this.errorMessage = res.Error;
          } else {
            // this.ngbModal.dismissAll();
            window.location.reload();
          }
      });
    }
  }

}
