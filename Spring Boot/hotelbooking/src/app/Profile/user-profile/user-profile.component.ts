import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { AuthService } from '../../service/auth.service';
import { BookingService } from '../../service/booking.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  user: User | null = null;
  errorMessage: string = '';

constructor(
  private AuthService:AuthService,
  private booking:BookingService
){

}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
  
    this.user = this.AuthService.getUser();
    }

}
