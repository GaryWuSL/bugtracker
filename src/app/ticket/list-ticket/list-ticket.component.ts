import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { TokenService } from 'src/app/service/token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {

  closeResult = '';

  user = {
    UserId:0,
    UserName:'',
    EmailAddress:'',
    PhotoFilePath:''
  }

  TicketList:any=[];
  TicketListWithoutFilter:any=[];
 
  ticket:any;

  ModalTitle:string="";
  TitleFilter:string="";
  ProjectFilter:string="";
  StatusNameFilter:string="";
  PriorityNameFilter:string="";
  AssignUserNameFilter:string="";
  UpdateDateFilter:string="";

  constructor(private service:SharedService, private modalService: NgbModal,
    private tokenService:TokenService, private activatedRoute: ActivatedRoute,
    private router:Router) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

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
    this.activatedRoute.queryParams.subscribe(params => {
      let paramStatus = params['status'];
      let paramAssignUserName = params['assignusername'];
      if (paramStatus != null) {
        this.StatusNameFilter = paramStatus;
      }
      if (paramAssignUserName != null)
      {
        this.AssignUserNameFilter = paramAssignUserName;
      }
    });
    this.refreshTicketList();
  }

  ngOnInit(): void {
    
  }
  
  addClick(){
    this.ticket={
      TicketId:0,
      FullDescription:"",
      Title:"",
      Organization:"",
      Project:"",
      AppModule:"",
      AppVersion:"",
      StatusId:0,
      PriorityId:0,
      AssignUserId:0,
      ImageFilePath:"",
      CreateUserId:0
    }
    this.ModalTitle="New Ticket";
  }

  editClick(item:any){
    this.ticket=item;
    this.ModalTitle="Edit Ticket";
  }

  deleteClick(item:any){
    if(confirm('Are you sure to delete the ticket?')){
      this.service.deleteTicket(item.ticketId).subscribe(data=>{
        this.refreshTicketList();
      })
    }
  }

  closeClick(){
    this.refreshTicketList();
  }


  refreshTicketList(){
    this.service.getTicketList().subscribe(data=>{
      this.TicketList=data;
      this.TicketListWithoutFilter=data;
      if ((this.StatusNameFilter.length > 0) || (this.AssignUserNameFilter.length > 0))
      {
        this.FilterFn();
      }
    });
  }

  FilterFn(){
    var titleFilter = this.TitleFilter;
    var projectFilter = this.ProjectFilter;
    var statusNameFilter = this.StatusNameFilter;
    var priorityNameFilter = this.PriorityNameFilter;
    var assignUserNameFilter = this.AssignUserNameFilter;
    var updateDateFilter =  this.UpdateDateFilter;

    this.TicketList = this.TicketListWithoutFilter.filter(function (el:any){
        return el.Title.toString().toLowerCase().includes(
          titleFilter.toString().trim().toLowerCase()
        )&&
        el.Project.toString().toLowerCase().includes(
          projectFilter.toString().trim().toLowerCase()
        )&&
        el.StatusName.toString().toLowerCase().includes(
          statusNameFilter.toString().trim().toLowerCase()
        )&&
        el.PriorityName.toString().toLowerCase().includes(
          priorityNameFilter.toString().trim().toLowerCase()
        )&&
        el.AssignUserName.toString().toLowerCase().includes(
          assignUserNameFilter.toString().trim().toLowerCase()
        )&&
        el.UpdateDate.toString().toLowerCase().includes(
          updateDateFilter.toString().trim().toLowerCase()
        )
    });
  }

  sortResult(prop:any,asc:any){
    this.TicketList = this.TicketListWithoutFilter.sort(function(a:any,b:any){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }

  open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(
			(result) => {
				  this.refreshTicketList()
			},
		);
	}


}
