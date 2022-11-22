import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../service/token.service';
import { LoginRequest } from '../message/login-request';
import { ErrorResponse } from '../message/error-response';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    loading = false;
    submitted = false;
    isLoggedIn = false;
    isLoginFailed = false;
    invalidLogin: boolean;
    AuthenticatedResponse:any;

    loginRequest: LoginRequest = {
        UserName: "",
        Password: ""
      };
    errorResponse: ErrorResponse = { error: '', errorCode: '' };

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService:SharedService,
        private tokenService:TokenService,
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        let isLoggedIn = this.tokenService.isLoggedIn();
    
        if (isLoggedIn) {
            this.isLoggedIn = false;
            this.sharedService.logout();
        }
    }

    get f() { return this.form.controls; }

    reloadPage(): void {
        window.location.reload();
    }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.loginRequest.UserName = this.f['username'].value;
        this.loginRequest.Password = this.f['password'].value;

        this.sharedService.login(this.loginRequest).subscribe({
            next: (data => {
              // console.debug(`logged in successfully ${data}`);
              if (data.UserId != 0)
              {
                this.tokenService.saveSession(data);
                this.isLoggedIn = true;
                this.isLoginFailed = false;
                this.router.navigate(['dashboard']).then(() => {
                  window.location.reload();
                });
              } else {
                this.errorResponse.error = data.Error;
                this.errorResponse.errorCode = data.ErrorCode;
                this.isLoggedIn = false;
                this.isLoginFailed = true;  
                this.loading = false;
                alert(this.errorResponse.error);
              }
            }),
            error: ((error: ErrorResponse) => {
              this.errorResponse = error;
              this.isLoggedIn = false;
              this.isLoginFailed = true;
              this.loading = false;
              alert(this.errorResponse.error);
            })
      
        });
        
    }

}
