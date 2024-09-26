import { Component } from '@angular/core';
import { LocationService } from '../../service/location.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewlocation',
  templateUrl: './viewlocation.component.html',
  styleUrls: ['./viewlocation.component.css']
})

export class ViewlocationComponent {
  locations: any[] = [];
  filteredLocations: any[] = [];
  selectedLocationName: string = ''; 
  checkinDate: string = '';
  checkoutDate: string = '';

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations() {
    this.locationService.getAllLocation().subscribe({
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

  goToCreateBooking() {
    if (!this.checkinDate || !this.checkoutDate) {
      alert('Please select check-in and check-out dates.');
      return;
    }

    if (new Date(this.checkoutDate) <= new Date(this.checkinDate)) {
      alert('Check-out date must be after check-in date.');
      return;
    }

    if (!this.selectedLocationName) {
      alert('Please select a location.');
      return;
    }

    const locationId = this.selectedLocationName; 
    this.router.navigate(['/createbooking'], {
      queryParams: {
        checkinDate: this.checkinDate,
        checkoutDate: this.checkoutDate,
        locationId: locationId 
      }
    });
  }

  viewHotels(locationId: string): void {
    if (!this.checkinDate || !this.checkoutDate) {
      alert('Please select check-in and check-out dates.');
      return;
    }

    if (new Date(this.checkoutDate) <= new Date(this.checkinDate)) {
      alert('Check-out date must be after check-in date.');
      return;
    }

    this.locationService.setCheckinDate(this.checkinDate);
    this.locationService.setCheckoutDate(this.checkoutDate);

    this.router.navigate(['/hotel', locationId], {
      queryParams: {
        checkinDate: this.checkinDate,
        checkoutDate: this.checkoutDate
      }
    });
  }
}
