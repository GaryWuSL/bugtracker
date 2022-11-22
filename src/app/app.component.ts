import { Component, ViewChild  } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SharedService } from '../app/service/shared.service';
import { TokenService } from '../app/service/token.service';
import { ErrorResponse } from '../app/message/error-response';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'bugtracker';

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  error: ErrorResponse = { error: '', errorCode: '' };

  user = {
    UserId:0,
    UserName:'',
    EmailAddress:'',
    PhotoFilePath:''
  }

  constructor(
    private observer: BreakpointObserver, 
    private router: Router,
    private sharedService:SharedService,
    private tokenService:TokenService
  ) {
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

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 640px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res:any) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  logoutClick() {
    this.sharedService.logout().subscribe({
        next: (data => {
          // console.debug(`logged in successfully ${data}`);
          if (data.UserId == 0)
          {
            this.tokenService.saveSession(data);
            this.router.navigate(['login']).then(() => {
              window.location.reload();
            });
          } 
        }),
        error: ((error: ErrorResponse) => {
          this.error = error;
        })
  
    });
}
 
}