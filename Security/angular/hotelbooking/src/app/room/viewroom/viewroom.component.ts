import { Component, } from '@angular/core';
import { HotelService } from '../../service/hotel.service';
import { RoomService } from '../../service/room.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-viewroom',
  templateUrl: './viewroom.component.html',
  styleUrls: ['./viewroom.component.css']
})
export class ViewroomComponent {
  hotelId: string;
  hotel: any;   // Assuming hotel is an object
  rooms: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private hotelService: HotelService,
    private router: Router
  ) {
    this.hotelId = this.route.snapshot.paramMap.get('hotelId') || '';  // Get hotel ID from route parameters
  }

  ngOnInit(): void {
    if (this.hotelId) {
      this.getHotelDetails(this.hotelId);
      this.getRoomsByHotel(this.hotelId);
    }
  }

  // Fetch hotel details using HotelService
  getHotelDetails(hotelId: string): void {
    this.hotelService.getHotelById(hotelId).subscribe({
      next: res => {
        this.hotel = res;
        console.log('Hotel details loaded:', this.hotel);
      },
      error: err => {
        console.error('Error loading hotel details', err);
      }
    });
  }

  // Fetch rooms by hotel ID using RoomService
  getRoomsByHotel(hotelId: string): void {
    this.roomService.getRoomByHotel(hotelId).subscribe({
      next: res => {
        this.rooms = res;
        console.log('Rooms loaded:', this.rooms);
      },
      error: err => {
        console.error('Error loading rooms', err);
      }
    });
  }
  

  updateRoom(id: string) {
    this.router.navigate(['/updateroom', id]);

  }
}









