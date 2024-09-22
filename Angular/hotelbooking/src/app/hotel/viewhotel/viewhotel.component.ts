import { Component,} from '@angular/core';
import { HotelService } from '../../service/hotel.service';
import { LocationService } from '../../service/location.service';

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-viewhotel',
  templateUrl: './viewhotel.component.html',
  styleUrl: './viewhotel.component.css'
})
export class ViewhotelComponent {
  locationId:string;
  location: any;
  hotels:any[]=[];

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private locationService:LocationService,
    private router: Router

  ) { 
    this.locationId = this.route.snapshot.paramMap.get('locationId') || '';
  }

  ngOnInit(): void {
    if (this.locationId) {
      this.getLocationDetails(this.locationId);
      this.getLocationByHotel(this.locationId);
  }
  }
  getLocationDetails(locationId: string): void {
    this.locationService.getLocationById(this.locationId).subscribe({
      next: res => {
        this.location = res;
        console.log(' details loaded:', this.location);
      },
      error: err => {
        console.error('Error loading hotel details', err);
      }
    });
  }

 
  getLocationByHotel(locationId: string): void {
    this.hotelService.getHotelsByLocation(locationId).subscribe({
      next: res => {
        this.hotels = res;
        console.log('Rooms loaded:', this.hotels);
      },
      error: err => {
        console.error('Error loading rooms', err);
      }
    });
  }


  updateHotel(id: string) {
    this.router.navigate(['/updatehotel',id]);

  }


  viewRooms(hotelId: string): void {
 
    this.router.navigate(['/room', hotelId]);
  }

  deleteHotel(id: number): void {
    if (confirm('Are you sure you want to delete this hotel?')) {
      this.hotelService.deleteHotel(id).subscribe({
        next: () => {
        
          this.hotels = this.hotels.filter((hotel: any) => hotel.id !== id);
        },
        error: (err) => {
          console.error('Error deleting hotel:', err);
        }
      });
    }
  }
}


 