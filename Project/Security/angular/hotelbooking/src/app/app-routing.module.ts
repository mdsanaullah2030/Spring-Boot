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


import { ViewroomComponent } from './room/viewroom/viewroom.component';
import { CreateroomComponent } from './room/createroom/createroom.component';
import { UpdatelocationComponent } from './location/updatelocation/updatelocation.component';
import { UpdateroomComponent } from './room/updateroom/updateroom.component';
import { UpdatehotelComponent } from './hotel/updatehotel/updatehotel.component';
import { AdminHotelGuard } from './Guards/admin-hotel.guard';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  
  
  {path:'about',component:AboutComponent},
  {path:'home',component:HomeComponent},

  {path:'location',component:ViewlocationComponent},
  {path:'creat',component:CreatelocationComponent},
  {path:'update/:id',component:UpdatelocationComponent},

  {path:'hotel',component:ViewhotelComponent},
  {path:'createhotel',component:CreatehotelComponent},
  {path:'updatehotel/:id',component:UpdatehotelComponent},

  {path:'room/:hotelId',component:ViewroomComponent},
  {path:'createroom',component:CreateroomComponent},
  {path:'updateroom/:id',component:UpdateroomComponent},
  
  {path:'register',component:RegistrationComponent},
  {path:'login',component:LoginComponent},

  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

