import { Component, OnInit, Input } from '@angular/core';  
import { NgForm } from '@angular/forms';
import { SharedService } from 'src/app/service/shared.service';
import { UserRequest } from 'src/app/message/user-request';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  @Input() user:any;

  userRequest: UserRequest = {
    UserId: 0,
    UserName: "",
    UserDescription: "",
    Password: "",
    ConfirmPassword: "",
    EmailAddress: "",
    PhotoFilePath: ""
  };
  isSuccessful: boolean = false;
  isSaveFailed: boolean = false;
  uploadfile: File;
  errorMessage: string = '';

  // constructor(private service:SharedService, private ngForm:NgForm) { }
  constructor(private service:SharedService) { }

  ngOnInit(): void {

    if (this.user != null)
    {
      this.userRequest.UserId = this.user.UserId;
      this.userRequest.UserName = this.user.UserName;
      this.userRequest.UserDescription = this.user.UserDescription;
      this.userRequest.Password = this.user.Password;
      this.userRequest.ConfirmPassword = this.user.Password;
      this.userRequest.EmailAddress = this.user.EmailAddress;
      this.userRequest.PhotoFilePath = this.user.PhotoFilePath;
    }
  }

  onSubmit(ngUser:NgForm) {
    
   if (!(ngUser.valid)) {
      return;
    }

    if ((!(this.uploadfile == null)) && (this.uploadfile.name.length > 0))
    {
      const formData:FormData=new FormData();
      formData.append('userFile',this.uploadfile,this.uploadfile.name);

      this.service.uploadfile(formData).subscribe((data:any)=>{
        if (data.toString().length > 0) {
          this.userRequest.PhotoFilePath=environment.attachmentUrl + data.toString();
        } else {
          if ((this.userRequest.PhotoFilePath == null) || (this.userRequest.PhotoFilePath == "")) {
            this.userRequest.PhotoFilePath=environment.attachmentUrl + environment.filenameDefault;
          }
        }
        this.UpdateUser(this.userRequest);
      })
    } else {
      if ((this.userRequest.PhotoFilePath == null) || (this.userRequest.PhotoFilePath == "")) {
        this.userRequest.PhotoFilePath = environment.attachmentUrl + environment.filenameDefault;
      }
      this.UpdateUser(this.userRequest);
    }
    
  }

  onChange(event:any) {
    this.uploadfile = event.target.files[0];
  }

  UpdateUser(userRequest: UserRequest)
  {
    if (userRequest.UserId == 0)
    {
      this.service.addUser(userRequest).subscribe(res=>{
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
      this.service.updateUser(userRequest).subscribe(res=>{
        if (res.Success == false)
          {
            this.isSaveFailed = true;
            this.errorMessage = res.Error;
          } else {
            window.location.reload();
          }
      });
    }
  }
}
