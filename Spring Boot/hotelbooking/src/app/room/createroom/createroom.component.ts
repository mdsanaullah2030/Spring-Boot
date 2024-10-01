import { Component, OnInit } from '@angular/core';
import { RoomModel } from '../../model/room.model';
import { HotelModel } from '../../model/hotel.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotelService } from '../../service/hotel.service';
import { RoomService } from '../../service/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createroom',
  templateUrl: './createroom.component.html',
  styleUrls: ['./createroom.component.css']
})
export class CreateroomComponent implements OnInit {
  image: File | null = null;
  hotels: HotelModel[] = [];
  formGroup!: FormGroup;
  rooms: RoomModel[] = [];

  roomtyp = [
    { value: 'Single Room', label: 'Single Room' },
    { value: 'Double Room', label: 'Double Room' },
    { value: 'Triple Room', label: 'Triple Room' },
    { value: 'Family Room', label: 'Family Room' },
    { value: 'Superior Room', label: 'Superior Room' },
    { value: 'Executive Room', label: 'Executive Room' },
    { value: 'Presidential Suite', label: 'Presidential Suite' }
  ];

  constructor(
    private hotelService: HotelService,
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadHotels();
    this.loadRooms();

    this.formGroup = this.formBuilder.group({
      roomType: [''],
      area: [''],
      adultNo: [''],
      childNo: [''],
      price: [''],
      availability: [''],
      hotel: [null]
    });
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }

  loadHotels() {
    this.hotelService.getAllHotel().subscribe({
      next: res => {
        this.hotels = res;
        console.log(this.hotels);
      },
      error: err => {
        console.error('Error fetching hotels:', err);
      }
    });
  }

  loadRooms() {
    this.roomService.getAllRooms().subscribe({
      next: res => {
        this.rooms = res;
        console.log(this.rooms);
      },
      error: err => {
        console.error('Error fetching rooms:', err);
      }
    });
  }

  onSubmit() {
    if (this.image) {
      const room: RoomModel = {
        ...this.formGroup.value,
        hotel: { id: this.formGroup.value.hotel } as HotelModel
      };

      this.roomService.createRoom(room, this.image).subscribe({
        next: res => {
          console.log('Room added successfully', res);
          this.loadRooms();  // Reload rooms after adding
        },
        error: err => {
          console.error('Error adding room:', err);
        }
      });
    } else {
      alert('Please select an image.');
    }
  }

  updateRoom(id: number) {
    this.router.navigate(['/updateroom', id]);
  }
}
