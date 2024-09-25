import { Component } from '@angular/core';
import { RoomModel } from '../../model/room.model';
import { BookingModel } from '../../model/booking.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelModel } from '../../model/hotel.model';
import { BookingService } from '../../service/booking.service';
import { HotelService } from '../../service/hotel.service';
import { RoomService } from '../../service/room.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrl: './createbooking.component.css'
})
export class CreatebookingComponent {
  bookingForm: FormGroup;
  hotels: any[] = [];
  rooms: any[] = [];

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private hotelService: HotelService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      checkindate: ['', Validators.required],
      checkoutdate: ['', Validators.required],
      hotel: ['', Validators.required],
      room: ['', Validators.required],
      totalprice: ['']
    });
  }

  ngOnInit() {
    this.loadHotels();
    this.loadRooms();

    
    this.route.queryParams.subscribe(params => {
      const checkinDate = params['checkinDate'];
      const checkoutDate = params['checkoutDate'];

      if (checkinDate && checkoutDate) {
        this.bookingForm.patchValue({
          checkindate: checkinDate,
          checkoutdate: checkoutDate
        });
      }
    });
  }

  loadHotels() {
    this.hotelService.getAllHotel().subscribe((data) => {
      this.hotels = data;
    });
  }

  loadRooms() {
    this.roomService.getAllRooms().subscribe((data) => {
      this.rooms = data;
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const bookingData = this.bookingForm.value;

      this.bookingService.createBoking(bookingData).subscribe(
        (response) => {
          console.log('Booking saved successfully!', response);
          this.router.navigate(['/bookings']);
        },
        (error) => {
          console.error('Error saving booking', error);
        }
      );
    }
  }

  
}