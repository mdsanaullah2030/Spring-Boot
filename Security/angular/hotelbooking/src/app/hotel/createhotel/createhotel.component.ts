import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HotelModel } from '../../model/hotel.model';
import { LocationModel } from '../../model/location.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotelService } from '../../service/hotel.service';
import { Router } from '@angular/router';
import { LocationService } from '../../service/location.service';

@Component({
  selector: 'app-createhotel',
  templateUrl: './createhotel.component.html',
  styleUrl: './createhotel.component.css'
})
export class CreatehotelComponent {
  image: File | null = null;
  hotel: HotelModel = new HotelModel();
  locations: LocationModel[] = [];
  hotels: HotelModel[] = [];
  formGroup!: FormGroup;
 


  rating: { value: string, label: string }[] = [
    { value: '**', label: '**' },
    { value: '***', label: '***' },
    { value: '****', label: '****' },
    { value: '*****', label: '*****' },
  ];

 
  constructor(
    private hotelService: HotelService,
    private formBuilder: FormBuilder,
    private router: Router,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.loadLocations();  
    this.loadHotels(); // Load hotels on initialization

    this.formGroup = this.formBuilder.group({
      name: [''],
      address: [''],
      maxPrice: [''],
      minPrice: [''],
      rating: [''],
      location: [null]
    });
  }


  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }
  // Load locations from backend
  loadLocations() {  
    this.locationService.getAllLocation().subscribe({
      next: res => {
        this.locations = res;
      },
      error: err => {
        console.error('Error fetching locations:', err);  
      }
    });
  }

  // Load hotels from backend
  loadHotels() {
    this.hotelService.getAllHotel().subscribe({
      next: res => {
        this.hotels = res;
      },
      error: err => {
        console.error('Error loading hotels', err);
      }
    });
  }

  // Create hotel method
  onSubmit() {
    if (this.image) {
      const hotel: HotelModel = {
        ...this.formGroup.value,
        location: { id: this.formGroup.value.location } as LocationModel,
       
      };

      this.hotelService.createHotel(hotel, this.image).subscribe({
        next: res => {
          this.hotels.push(res); // Update the hotel list without reloading the page
          this.router.navigate(['/hotel']);
        },
        error: err => {
          console.error('Error adding hotel:', err);
        }
      });
    } else {
      alert('Please select an image.');
    }
  }




  getHotelsByLocation(locationId: string): void {
    this.hotelService.getHotelsByLocation(locationId).subscribe({
      next: res => {
        this.hotels = res;
        console.log('Hotels loaded:', this.hotels);
      },
      error: err => {
        console.error('Error loading hotels', err);
      }
    });
  }
  // Delete hotel
  deleteHotel(id: number): void {
    if (confirm('Are you sure you want to delete this hotel?')) {
      this.hotelService.deleteHotel(id).subscribe({
        next: () => {
          this.hotels = this.hotels.filter(hotel => hotel.id !== id); // Remove hotel from the list
        },
        error: err => {
          console.error('Error deleting hotel:', err);
        }
      });
    }
  }
  updateHotel(id: number): void {
    this.router.navigate(['/updatehotel', id]);
  }
}
