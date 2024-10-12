import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../service/booking.service';
import { BookingModel } from '../../model/booking.model';
import { Router } from '@angular/router';
import { BookingDTO } from '../../model/BookingDTO.model';


@Component({
  selector: 'app-viewbooking',
  templateUrl: './viewbooking.component.html',
  styleUrls: ['./viewbooking.component.css']
})
export class ViewbookingComponent implements OnInit {
 // bookings: BookingModel[] = []; // Array to hold bookings
  
  bookings: BookingDTO[] = [];

  constructor(private bookingService: BookingService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe(
      (data: BookingDTO[]) => {
        this.bookings = data;
      },
      error => {
        console.error('Error fetching bookings:', error);
      }
    );
  }

}
