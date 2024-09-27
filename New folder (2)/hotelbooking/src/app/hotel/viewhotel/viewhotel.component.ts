import { Component, EventEmitter, Input, Output,} from '@angular/core';
import { HotelService } from '../../service/hotel.service';
import { LocationService } from '../../service/location.service';
import { RoomService } from '../../service/room.service';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';  // Solid star icon
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
// Regular star icon
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
  
  


  @Input() rating: number = 0;  // Current rating value (default 0)
  @Input() maxStars: number = 5;  // Maximum stars (default 5)
  @Output() ratingChange = new EventEmitter<number>();  // Event emitter for changes

  faStarSolid = faStarSolid;
  faStarRegular = faStarRegular;  // Fixed icon assignment

  get stars() {
    return Array(this.maxStars).fill(0);  // Creates an array for rendering stars
  }

  rate(star: number): void {
    this.rating = star;
    this.ratingChange.emit(this.rating);  // Emit the new rating value
  }
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

  updateHotel(id: string): void {
    this.router.navigate(['/updatehotel', id]);
  }

  viewRooms(hotelId: string): void {
    this.router.navigate(['/room', hotelId]);
  }

  deleteHotel(id: number): void {
    if (confirm('Are you sure you want to delete this hotel?')) {
      this.hotelService.deleteHotel(id).subscribe({
        next: () => {
          this.hotels = this.hotels.filter(hotel => hotel.id !== id);
        },
        error: err => {
          console.error('Error deleting hotel:', err);
        }
      });
    }
  }
}



 