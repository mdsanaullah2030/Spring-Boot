import { Component, } from '@angular/core';
import { RoomModel } from '../../model/room.model';
import { HotelModel } from '../../model/hotel.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotelService } from '../../service/hotel.service';
import { Router } from '@angular/router';
import { RoomService } from '../../service/room.service';


@Component({
  selector: 'app-createroom',
  templateUrl: './createroom.component.html',
  styleUrl: './createroom.component.css'
})
export class CreateroomComponent {
  image: File | null = null;
  hotel: RoomModel = new RoomModel();
  hotels: HotelModel[] = [];
  formGroup!:FormGroup;



  roomtyp: { value: string, label: string }[] = [
    { value: 'Single Room', label: 'Single Room' },
    { value: 'Double Room', label: 'Double Room' },
    { value: 'Triple Room', label: 'Triple Room'},
    { value: 'Family Room', label: 'Family Room' },
    { value: 'Superior Room', label: 'Superior Room'},
    { value: 'Executive Room', label: 'Executive Room'},
    { value: 'Presidential Suite', label: 'Presidential Suite' },
  ];



  constructor(
    private hotelService: HotelService,
    private formBuilder: FormBuilder,
    private router: Router,
    private roomService:RoomService 
  ) { }

  ngOnInit(): void {
    this.loadHotels();  


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

  onSubmit() {
    if (this.image) {

      const room: RoomModel = {
        ...this.formGroup.value,
        hotel: { id: this.formGroup.value.hotel } as HotelModel
      };
  
      this.roomService.createRoom(room, this.image).subscribe({
        next: res => {
          console.log('Room added successfully', res);
          this.router.navigate(['/room']);
          console.log('Response:', res);
        },
        error: err => {
          console.error('Error adding room:', err);
        }
      });
    } else {
      alert('Please select an image.');
    }
  }

    
  }