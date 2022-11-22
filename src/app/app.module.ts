import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TicketComponent } from './ticket/ticket.component';
import { ListTicketComponent } from './ticket/list-ticket/list-ticket.component';
import { AddEditTicketComponent } from './ticket/add-edit-ticket/add-edit-ticket.component';
import { UserComponent } from './user/user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { AddEditUserComponent } from './user/add-edit-user/add-edit-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListDashboardComponent } from './dashboard/list-dashboard/list-dashboard.component';
import { PriorityComponent } from './priority/priority.component';
import { ListPriorityComponent } from './priority/list-priority/list-priority.component';
import { AddEditPriorityComponent } from './priority/add-edit-priority/add-edit-priority.component';
import { StatusComponent } from './status/status.component';
import { ListStatusComponent } from './status/list-status/list-status.component';
import { AddEditStatusComponent } from './status/add-edit-status/add-edit-status.component';
import { SharedService} from './service/shared.service';
import { AuthInterceptorProvider} from './interceptors/auth.interceptor';
import { ErrorInterceptorProvider} from './interceptors/error.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card'; 
import { MatBadgeModule } from '@angular/material/badge'; 
import { MatChipsModule } from '@angular/material/chips'; 
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatStepperModule } from '@angular/material/stepper'; 
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { FollowupComponent } from './followup/followup.component';
import { ListFollowupComponent } from './followup/list-followup/list-followup.component';
import { AddEditFollowupComponent } from './followup/add-edit-followup/add-edit-followup.component';
import { SetupComponent } from './setup/setup.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketComponent,
    ListTicketComponent,
    AddEditTicketComponent,
    UserComponent,
    ListUserComponent,
    AddEditUserComponent,
    DashboardComponent,
    ListDashboardComponent,
    PriorityComponent,
    ListPriorityComponent,
    AddEditPriorityComponent,
    StatusComponent,
    ListStatusComponent,
    AddEditStatusComponent,
    LoginComponent,
    FollowupComponent,
    ListFollowupComponent,
    AddEditFollowupComponent,
    SetupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
	  FormsModule,
	  ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatBadgeModule,
    MatGridListModule,
    MatStepperModule,
    MatChipsModule,
    MatDialogModule
  ],
  providers: [SharedService, AuthInterceptorProvider, ErrorInterceptorProvider],
  bootstrap: [AppComponent],
  entryComponents: [AddEditUserComponent]
})
export class AppModule { }

