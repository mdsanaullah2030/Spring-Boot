import { Component } from '@angular/core';
import { RoomModel } from '../../model/room.model';
import { BookingModel } from '../../model/booking.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelModel } from '../../model/hotel.model';
import { BookingService } from '../../service/booking.service';

import { RoomService } from '../../service/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../service/location.service';



@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrl: './createbooking.component.css'
})
export class CreatebookingComponent {
  bookingForm: FormGroup;
  roomM: RoomModel = new RoomModel();

  roomId?: number;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService
  ) {
    this.bookingForm = this.fb.group({
      
      hotel: ['', Validators.required],
      room: ['', Validators.required],
      totalprice: ['']
    });
  }

  ngOnInit() {
    const roomId = this.route.snapshot.params['roomId'];
    this.roomService.getById(roomId).subscribe((data) => {
      this.roomM = data;

      // Log the roomM object to verify it includes price
      console.log('Room data:', this.roomM);

      this.bookingForm.patchValue({
        hotel: this.roomM.hotel,
        room: this.roomM
      });

      // Ensure price exists
      if (this.roomM.price) {
        this.calculatePrice();
      } else {
        console.error('Room price is missing');
      }
    });
  }

  calculatePrice() {
    // Get check-in and check-out dates from the service
    const checkinDateStr = this.locationService.getCheckinDate();
    const checkoutDateStr = this.locationService.getCheckoutDate();

    // Ensure dates are not empty
    if (checkinDateStr && checkoutDateStr) {
      // Convert date strings to Date objects
      const checkinDate = new Date(checkinDateStr);
      const checkoutDate = new Date(checkoutDateStr);

      // Ensure that the check-out date is after the check-in date
      if (checkoutDate > checkinDate) {
        const timeDifference = checkoutDate.getTime() - checkinDate.getTime();
        const days = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days

        // Calculate total price
        const totalPrice = days * this.roomM.price;

        console.log(this.roomM.price + " room  price")
        console.log(totalPrice + " Total Price")


        // Update the total price in the booking form
        this.bookingForm.patchValue({ totalprice: totalPrice });
      } else {
        // Invalid date range, reset the total price
        alert('Check-out date must be after check-in date.');
        this.bookingForm.patchValue({ totalprice: 'totalprice' });
      }
    } else {
      // One or both dates are missing, reset the total price
      this.bookingForm.patchValue({ totalprice: '' });
    }
  }


  onSubmit() {
    if (this.bookingForm.valid) {
      const bookingData = this.bookingForm.value;
  
      bookingData.checkindate = this.locationService.getCheckinDate();
      bookingData.checkoutdate = this.locationService.getCheckoutDate();


      console.log(bookingData);
      this.bookingService.createBoking(bookingData).subscribe(
        (response) => {
          console.log('Booking saved successfully!', response);
          this.router.navigate(['/booking']);
        },
        (error) => {
          console.error('Error saving booking', error);
        }
      );
    }
  }


}