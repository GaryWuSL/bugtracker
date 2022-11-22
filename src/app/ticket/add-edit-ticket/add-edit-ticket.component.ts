import { Component, OnInit, Input } from '@angular/core';  
import { NgForm } from '@angular/forms';
import { SharedService } from 'src/app/service/shared.service';
import { TicketRequest } from 'src/app/message/ticket-request';
import { TokenService } from 'src/app/service/token.service';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-add-edit-ticket',
  templateUrl: './add-edit-ticket.component.html',
  styleUrls: ['./add-edit-ticket.component.css']
})
export class AddEditTicketComponent implements OnInit {

  @Input() ticket:any;

  ticketRequest: TicketRequest = {
    TicketId: 0,
    Title: "",
    FullDescription: "",
    Organization: "",
    Project: "",
    AppModule:"",
    AppVersion:"",
    PriorityId: 0,
    StatusId: 0,
    ImageFilePath: "",
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

    if ((this.ticket != null) && (this.ticket.TicketId > 0))
    {
      this.ticketRequest.TicketId = this.ticket.TicketId;
      this.ticketRequest.Title = this.ticket.Title;
      this.ticketRequest.FullDescription = this.ticket.FullDescription;
      this.ticketRequest.Organization = this.ticket.Organization;
      this.ticketRequest.Project = this.ticket.Project;
      this.ticketRequest.AppModule = this.ticket.AppModule;
      this.ticketRequest.AppVersion = this.ticket.AppVersion;
      this.ticketRequest.ImageFilePath = this.ticket.ImageFilePath;
      this.ticketRequest.PriorityId = this.ticket.PriorityId;
      this.ticketRequest.StatusId = this.ticket.StatusId;
      this.ticketRequest.AssignUserId = this.ticket.AssignUserId;
      this.ticketRequest.CreateUserId =this.ticket.CreateUserId;
      if ((session != null) && (session.UserId > 0))
      {
        this.ticketRequest.UpdateUserId = session.UserId;
      } else {
        this.ticketRequest.UpdateUserId = this.ticket.UpdateUserId;
      }
    } else {
      if ((session != null) && (session.UserId > 0))
      {
        this.ticketRequest.AssignUserId = session.UserId;
        this.ticketRequest.CreateUserId = session.UserId;
        this.ticketRequest.UpdateUserId = session.UserId;
      }
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

  onSubmit(ngTicket:NgForm) {
    
   if (!(ngTicket.valid)) {
      return;
    }
    
    if ((!(this.uploadfile == null)) && (this.uploadfile.name.length > 0))
    {
      const formData:FormData=new FormData();
      formData.append('ticketFile',this.uploadfile,this.uploadfile.name);

      this.service.uploadfile(formData).subscribe((data:any)=>{
        if (data.toString().length > 0) {
          this.ticketRequest.ImageFilePath=environment.attachmentUrl + data.toString();
        } else {
          this.ticketRequest.ImageFilePath="";
        }
        this.UpdateTicket(this.ticketRequest);    
      })
    } else {
      // this.ticketRequest.ImageFilePath="";
      this.UpdateTicket(this.ticketRequest);    
    }

    // this.isSaveFailed = true;
    
  }

  onFileChange(event:any) {
    this.uploadfile = event.target.files[0];
  }

  UpdateTicket(ticketRequest: TicketRequest)
  {
    if (ticketRequest.TicketId == 0)
    {
      this.service.addTicket(ticketRequest).subscribe(res=>{
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
      this.service.updateTicket(ticketRequest).subscribe(res=>{
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
