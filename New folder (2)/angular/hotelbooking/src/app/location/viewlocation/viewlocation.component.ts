import { Component, } from '@angular/core';
import { LocationService } from '../../service/location.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-viewlocation',
  templateUrl: './viewlocation.component.html',
  styleUrl: './viewlocation.component.css'
})

  export class ViewlocationComponent {
    locations:any;

    constructor(private locationService:LocationService,
      private router: Router
    ){}
    
    
    
    
    
      ngOnInit(): void {
        this.locations=this.locationService.getAllLocation();
      }

      loadLocations() {
        this.locationService.getAllLocation().subscribe((data) => {
          this.locations = data;
        });
      }
    
      DeleteLocation(id: number): void {
        this.locationService.deleteLocation(id).subscribe(() => {
          console.log('Location deleted successfully');
         
        });
      }

      updateLocation(id: string) {
        this.router.navigate(['/update',id]);
    
      }
    
  }