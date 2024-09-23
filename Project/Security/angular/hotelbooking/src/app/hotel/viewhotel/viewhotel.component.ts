import { Component,} from '@angular/core';
import { HotelService } from '../../service/hotel.service';
import { LocationService } from '../../service/location.service';
import { RoomService } from '../../service/room.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-viewhotel',
  templateUrl: './viewhotel.component.html',
  styleUrl: './viewhotel.component.css'
})
export class ViewhotelComponent {

  locations: any;
  hotels: any;
  rooms:any;

  constructor(
    private hotelService: HotelService,
    private locationService: LocationService,
    private roomService: RoomService,
    private router: Router

  ) { }

  ngOnInit(): void {

    this.loadLocations();
  }


  loadLocations() {

    this.locations = this.locationService.getAllLocation();
    this.hotelService.getAllHotel().subscribe({

      next: res => {
        this.hotels = res;
      },

      error: err => {
        console.log(err)

      }

    });


  }

 


  viewRooms(hotelId: string): void {
 
    this.router.navigate(['/room', hotelId]);
  }

  
  updateHotel(id: string) {
    this.router.navigate(['/updatehotel',id]);

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



 