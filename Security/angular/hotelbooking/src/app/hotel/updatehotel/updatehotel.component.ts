import { Component, OnInit,} from '@angular/core';
import { HotelModel } from '../../model/hotel.model';
import { LocationService } from '../../service/location.service';
import { LocationModel } from '../../model/location.model';
import { HotelService } from '../../service/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-updatehotel',
  templateUrl: './updatehotel.component.html',
  styleUrl: './updatehotel.component.css'
})
export class UpdatehotelComponent implements OnInit{
  locations: LocationModel[] = [];
  hotel: HotelModel = new HotelModel();
  selectedImage?: File;
  id: string = '';

  constructor(
    private hotelService: HotelService,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; 
    this.hotelService.getHotelById(this.id).subscribe({
      next: (res) => {
        this.hotel = res;
        console.log(this.hotel);
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.loadLocations();
  }

  loadLocations(): void {
    this.locationService.getAllLocationforHotel().subscribe({
      next: (res: LocationModel[]) => {
        this.locations = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  updateHotel(): void {
    this.hotelService.updateHotel(this.id, this.hotel).subscribe({
      next: () => {
        this.router.navigate(['/hotel']); 
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}











 


 