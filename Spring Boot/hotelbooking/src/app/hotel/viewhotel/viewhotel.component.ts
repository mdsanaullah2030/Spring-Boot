import { Component, EventEmitter, Input, Output,} from '@angular/core';
import { HotelService } from '../../service/hotel.service';
import { LocationService } from '../../service/location.service';
import { RoomService } from '../../service/room.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewhotel',
  templateUrl: './viewhotel.component.html',
  styleUrl: './viewhotel.component.css'
})
export class ViewhotelComponent {

  locationId: string;
  location: any;
  hotels: any[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private locationService: LocationService,
    private router: Router,
    
  ) {
    this.locationId = this.route.snapshot.paramMap.get('locationId') || '';
  }

  ngOnInit(): void {

    this.locationService.getCheckinDate();
    this.locationService.getCheckoutDate();

    console.log(this.locationService.getCheckinDate() + "          "+
    this.locationService.getCheckoutDate());

    console.log("**************************************")

    if (this.locationId) {
      this.getLocationDetails(this.locationId);
      this.getHotelsByLocation(this.locationId);
    }
  }

  getLocationDetails(locationId: string): void {
    this.locationService.getLocationById(locationId).subscribe({
      next: res => {
        this.location = res;
        console.log('Location details loaded:', this.location);
      },
      error: err => {
        console.error('Error loading location details', err);
      }
    });
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


  viewRooms(hotelId: string): void {
    this.router.navigate(['/room', hotelId]);
  }

 
}



 