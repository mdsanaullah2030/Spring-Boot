import { Component, } from '@angular/core';
import { LocationService } from '../../service/location.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-viewlocation',
  templateUrl: './viewlocation.component.html',
  styleUrl: './viewlocation.component.css'
})

export class ViewlocationComponent {
  locations: any[] = [];
  filteredLocations: any[] = [];
  searchTerm: string = '';
  selectedLocationName: string = '';

  constructor(
    private locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations() {
    this.locationService.getAllLocationforHotel().subscribe({
      next: (data) => {
        this.locations = data;
        this.filteredLocations = [...this.locations];
      },
      error: (err) => {
        console.error('Error loading locations', err);
      }
    });
  }


  onLocationSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedLocationName = target.value;


    if (this.selectedLocationName) {
      this.locationService.findLocationName(this.selectedLocationName).subscribe({
        next: (data) => {
          this.filteredLocations = data;
        },
        error: (err) => {
          console.error('Error loading selected location', err);
        }
      });
    } else {
      this.filteredLocations = [...this.locations];
    }
  }
}


