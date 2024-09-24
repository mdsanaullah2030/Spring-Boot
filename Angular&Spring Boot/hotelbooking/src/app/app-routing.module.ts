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
import { UpdatelocationComponent } from './location/updatelocation/updatelocation.component';
import { UpdateroomComponent } from './room/updateroom/updateroom.component';
import { UpdatehotelComponent } from './hotel/updatehotel/updatehotel.component';
import { ViewbookingComponent } from './booking/viewbooking/viewbooking.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },


  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'location', component: ViewlocationComponent },
  { path: 'creat', component: CreatelocationComponent },
  { path: 'update/:id', component: UpdatelocationComponent },
  { path: 'hotel/:locationId', component: ViewhotelComponent },
  { path: 'createhotel', component: CreatehotelComponent },
  { path: 'updatehotel/:id', component: UpdatehotelComponent },
  { path: 'room/:hotelId', component: ViewroomComponent },
  { path: 'createroom', component: CreateroomComponent },
  { path: 'updateroom/:id', component: UpdateroomComponent },
  { path: 'booking', component: ViewbookingComponent },
  { path: 'reg', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'userprofile', component: UserprofileComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

