import { Component, OnInit,} from '@angular/core';
import { LocationModel } from '../../model/location.model';
import { LocationService } from '../../service/location.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-updatelocation',
  templateUrl: './updatelocation.component.html',
  styleUrl: './updatelocation.component.css'
})
export class UpdatelocationComponent  implements OnInit{
  location: LocationModel = new LocationModel();
  id: string = "";
  selectedImage?: File;

  constructor(
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieve the location ID from the route and fetch data for editing
    this.id = this.route.snapshot.params['id'];
    this.locationService.getLocationById(this.id).subscribe({
      next: (res) => {
        this.location = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  // Handle the file selection for the image
  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  // Update the location by submitting the form
  updateLocation() {
    this.locationService.updateLocation(this.id, this.location, this.selectedImage).subscribe({
      next: (res) => {
        this.router.navigate(['/location']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}