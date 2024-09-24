import { Component } from '@angular/core';
import { RoomModel } from '../../model/room.model';
import { BookingModel } from '../../model/booking.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelModel } from '../../model/hotel.model';
import { BookingService } from '../../service/booking.service';
import { HotelService } from '../../service/hotel.service';
import { RoomService } from '../../service/room.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrl: './createbooking.component.css'
})
export class CreatebookingComponent {
  bookingForm!: FormGroup;
  hotels: HotelModel[] = [];
  rooms: RoomModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private hotelService: HotelService,
    private roomService: RoomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadHotels();
    
    this.bookingForm = this.formBuilder.group({
      hotelId: ['', Validators.required],
      roomId: ['', Validators.required],
      checkindate: ['', Validators.required],
      checkoutdate: ['', Validators.required]
    });

    this.bookingForm.get('hotelId')?.valueChanges.subscribe((hotelId) => {
      this.loadRooms(hotelId);
    });
  }

  loadHotels() {
    // Fixed the method name to match the service
    this.hotelService.getAllHotel().subscribe({
      next: (res) => {
        this.hotels = res;
      },
      error: (err) => {
        console.error('Error loading hotels:', err);
      }
    });
  }

  loadRooms(hotelId: number) {
   
    this.roomService.getRoomByHotels(hotelId).subscribe({
      next: (res) => {
        this.rooms = res;
      },
      error: (err) => {
        console.error('Error loading rooms:', err);
      }
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const booking: BookingModel = {
        ...this.bookingForm.value,
        hotel: { id: this.bookingForm.value.hotelId },
        room: { id: this.bookingForm.value.roomId },
      };
    
      this.bookingService.createBoking(booking).subscribe({
        next: () => {
          console.log('Booking created successfully');
          this.router.navigate(['/bookings']);
        },
        error: (err) => {
          console.error('Error creating booking:', err);
        }
      });
    }
  }
}



