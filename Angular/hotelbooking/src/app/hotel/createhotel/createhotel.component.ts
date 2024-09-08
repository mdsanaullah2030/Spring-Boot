import { Component,} from '@angular/core';
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
  formGroup!:FormGroup;

  constructor(
    private hotelService: HotelService,
    private formBuilder: FormBuilder,
    private router: Router,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.loadLocations();  


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

  loadLocations() {  
    this.locationService.getAllLocation().subscribe({
      next: res => {
        this.locations = res;
        console.log(this.locations);
      },
      error: err => {
        console.error('Error fetching locations:', err);  
      }
    });
  }

  onSubmit() {
    if (this.image) {

      const hotel: HotelModel = {
        ...this.formGroup.value,
        location: { id: this.formGroup.value.location } as LocationModel
      };
  
      this.hotelService.createHotel(hotel, this.image).subscribe({
        next: res => {
          console.log('Hotel added successfully', res);
          this.router.navigate(['/hotel']);
          console.log('Response:', res);
        },
        error: err => {
          console.error('Error adding hotel:', err);
        }
      });
    } else {
      alert('Please select an image.');
    }
  }

}
 
