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
  location: LocationModel[] = [];
  hotels:HotelModel = new HotelModel()

  id: string = "";
  selectedImage?: File;

  constructor(
    private locationService: LocationService,
    private hotelService:HotelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.hotelService.getHotelById(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.hotels = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.loadLocation();
    this.updateHotel();
  }

  
  

  loadLocation(): void {
    this.locationService.getAllLocationforHotel().subscribe({
      next: (res: LocationModel[]) => {
        this.location= res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  updateHotel() {
    this.hotelService.updateHotel(this.id, this.hotels, this.selectedImage).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/hotel']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}











 


 