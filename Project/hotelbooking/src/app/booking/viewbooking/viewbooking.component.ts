import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../service/booking.service';
import { BookingModel } from '../../model/booking.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-viewbooking',
  templateUrl: './viewbooking.component.html',
  styleUrls: ['./viewbooking.component.css']
})
export class ViewbookingComponent implements OnInit {
  bookings: BookingModel[] = [];

  constructor(private bookingService: BookingService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.viewAllBooking().subscribe({
      next: (data: BookingModel[]) => {
        this.bookings = data;
        console.log(this.bookings); 
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
