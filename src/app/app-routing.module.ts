import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TicketComponent } from './ticket/ticket.component';
import { FollowupComponent } from './followup/followup.component';
import { SetupComponent } from './setup/setup.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent, canActivate: [AuthGuard]},
  {path:'user',component:UserComponent, canActivate: [AuthGuard]},
  {path:'ticket',component:TicketComponent, canActivate: [AuthGuard]},
  {path:'followup',component:FollowupComponent, canActivate: [AuthGuard]},
  {path:'help',component:SetupComponent, },
  {path:'login',component:LoginComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
