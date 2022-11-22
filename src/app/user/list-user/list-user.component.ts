import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  closeResult = '';

  constructor(private service:SharedService, 
    private modalService: NgbModal, 
    private router: Router) 
  { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  UserList:any=[];

  ModalTitle:string="";
  ActivateAddEditUser:boolean=false;
  user:any;

  UserIdFilter:string="";
  UserNameFilter:string="";
  UserDescriptionFilter:string="";
  EmailAddressFilter:string="";
  UserListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshUserList();
  }
  
  addClick(){
    this.user={
      UserId:0,
      UserName:"",
      UserDescription:"",
      Password:"",
      ConfirmPassword:"",
      EmailAddress:""
    }
    this.ModalTitle="Add User account";
    this.ActivateAddEditUser=true;

  }

  editClick(item:any){
    this.user=item;
    this.ModalTitle="Edit User account";
    this.ActivateAddEditUser=true;
  }

  deleteClick(item:any){
    if(confirm('Are you sure to delete the user account?')){
      this.service.deleteUser(item.UserId).subscribe(data=>{
        //alert(data.toString());
        this.refreshUserList();
      })
    }
  }

  closeClick(){
    this.ActivateAddEditUser=false;
    this.refreshUserList();
  }


  refreshUserList(){
    this.service.getUserList().subscribe(data=>{
      this.UserList=data;
      this.UserListWithoutFilter=data;
    });
  }

  FilterFn(){
    var UserIdFilter = this.UserIdFilter;
    var UserNameFilter = this.UserNameFilter;
    var UserDescriptionFilter = this.UserDescriptionFilter;
    var EmailAddressFilter = this.EmailAddressFilter;

    this.UserList = this.UserListWithoutFilter.filter(function (el:any){
        return el.UserId.toString().toLowerCase().includes(
          UserIdFilter.toString().trim().toLowerCase()
        )&&
        el.UserName.toString().toLowerCase().includes(
          UserNameFilter.toString().trim().toLowerCase()
        )&&
        el.UserDescription.toString().toLowerCase().includes(
          UserDescriptionFilter.toString().trim().toLowerCase()
        )&&
        el.EmailAddress.toString().toLowerCase().includes(
          EmailAddressFilter.toString().trim().toLowerCase()
        )
    });
  }

  sortResult(prop:any,asc:any){
    this.UserList = this.UserListWithoutFilter.sort(function(a:any,b:any){
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
				  this.refreshUserList()
			},
		);
	}

}
