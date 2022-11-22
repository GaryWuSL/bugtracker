import { Component, OnInit, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; 
import { MatChipsModule } from '@angular/material/chips'; 
import { SharedService } from 'src/app/service/shared.service';
import { TokenService } from 'src/app/service/token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-followup',
  templateUrl: './list-followup.component.html',
  styleUrls: ['./list-followup.component.css']
})
export class ListFollowupComponent implements OnInit {

  @Input() ticketid:number;

  user = {
    UserId:0,
    UserName:'',
    EmailAddress:'',
    PhotoFilePath:''
  }

  followup: any = {
    FollowupId: 0,
    TicketId: 0,
    Title: "",
    FullDescription: "",
    PriorityId: 0,
    StatusId: 0,
    AssignUserId: 0,
    CreateUserId: 0,
    UpdateUserId: 0,
    CreateDate: "",
    UpdateDate: ""
  };

  ticket: any = {
    TicketId: 0,
    Title: "",
    FullDescription: "",
    Organization:"",
    Project:"",
    AppModule:"",
    AppVersion:"",
    PriorityName: "",
    StatusName: "",
    AssignUserName: "",
    PriorityId: 0,
    StatusId: 0,
    AssignUserId: 0,
    CreateUserId: 0,
    UpdateUserId: 0,
    CreateDate: "",
    UpdateDate: ""
  };

  statusColor:string = "";

  constructor(private service:SharedService, 
    private matcardModule:MatCardModule, 
    private matchipsModule:MatChipsModule, 
    private modalService: NgbModal,
    private tokenService:TokenService) 
  {
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

  FollowupList:any=[];
  ModalTitle:string="";

  ngOnInit(): void {
    this.service.getTicket(this.ticketid).subscribe((data:any)=>{
      this.ticket=data;
      this.statusColor = this.service.getStatusColor(this.ticket.StatusId);
    });    

    this.refreshFollowupList();
  }

  addClick(){
    this.followup={
      FollowupId:0,
      TicketId:this.ticketid,
      Title:"RE:"+this.ticket.Title,
      FullDescription:"",
      StatusId:this.ticket.StatusId,
      PriorityId:this.ticket.PriorityId,
      AssignUserId:this.ticket.AssignUserId,
      CreateUserId:this.user.UserId
    }
    this.ModalTitle="New Follow";
  }

  editClick(item:any){
    this.followup=item;
    this.ModalTitle="Edit Follow";
  }

  deleteClick(item:any){
    // if(confirm('Are you sure to delete the follow up?')){
    //   this.service.deleteFollowup(item.followupId).subscribe(data=>{
    //     this.refreshFollowupList();
    //   })
    // }
  }

  closeClick(){
    this.refreshFollowupList();
  }


  refreshFollowupList(){
    this.service.getFollowupList(this.ticketid).subscribe(data=>{
      this.FollowupList=data;
    });
  }

  open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(
			(result) => {
				  this.refreshFollowupList();
			},
		);
	}

}
