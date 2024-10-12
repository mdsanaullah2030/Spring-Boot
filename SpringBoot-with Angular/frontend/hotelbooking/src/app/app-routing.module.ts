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
import { ViewbookingComponent } from './booking/viewbooking/viewbooking.component';
import { CreatebookingComponent } from './booking/createbooking/createbooking.component';
import { AdminHotelGuard } from './guard/admin-hotel.guard';
import { UserProfileComponent } from './Profile/user-profile/user-profile.component';
import { LogoutComponent } from './singIn/logout/logout.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },


  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'location', component: ViewlocationComponent },
  { path: 'creat', component: CreatelocationComponent ,canActivate: [AdminHotelGuard] },
  { path: 'update/:id', component: UpdatelocationComponent },
  { path: 'hotel/:locationId', component: ViewhotelComponent },
  { path: 'createhotel', component: CreatehotelComponent,canActivate: [AdminHotelGuard] },
  { path: 'updatehotel/:id', component: UpdatehotelComponent },
  { path: 'room/:hotelId', component: ViewroomComponent },
  { path: 'createroom', component: CreateroomComponent,canActivate: [AdminHotelGuard] },
  { path: 'updateroom/:id', component: UpdateroomComponent },
  { path: 'booking', component: ViewbookingComponent },
  { path: 'bookingcreat/:roomId', component: CreatebookingComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  {path:'logout',component:LogoutComponent},
  {path:'profile',component:UserProfileComponent},
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

