import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewlocationComponent } from './location/viewlocation/viewlocation.component';
import { CreatelocationComponent } from './location/createlocation/createlocation.component';

import { ViewhotelComponent } from './hotel/viewhotel/viewhotel.component';
import { CreatehotelComponent } from './hotel/createhotel/createhotel.component';

import { AboutComponent } from './style/about/about.component';
import { HomeComponent } from './style/home/home.component';
import { RegistrationComponent } from './singIn/registration/registration.component';
import { LoginComponent } from './singIn/login/login.component';
import { AuthGuard } from './guard/authguard.guard';
import { LogoutComponent } from './singIn/logout/logout.component';
import { UserprofileComponent } from './user/userprofile/userprofile.component';
import { ViewroomComponent } from './room/viewroom/viewroom.component';
import { CreateroomComponent } from './room/createroom/createroom.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  
  
  {path:'about',component:AboutComponent},
  {path:'home',component:HomeComponent},
  {path:'location',component:ViewlocationComponent},
  {path:'creat',component:CreatelocationComponent},
  {path:'hotel',component:ViewhotelComponent},
  {path:'createhotel',component:CreatehotelComponent},
  {path:'room/:hotelId',component:ViewroomComponent},
  {path:'createroom',component:CreateroomComponent},
  {path:'reg',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'logout',component:LogoutComponent},
  {path: 'userprofile', component:UserprofileComponent, canActivate:[AuthGuard]},
  {path:'**',redirectTo:'login',pathMatch:'full'},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

