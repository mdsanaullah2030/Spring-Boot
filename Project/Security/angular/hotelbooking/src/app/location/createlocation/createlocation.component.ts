import { Component,} from '@angular/core';
import { LocationModel } from '../../model/location.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationService } from '../../service/location.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';




@Component({
  selector: 'app-createlocation',
  templateUrl: './createlocation.component.html',
  styleUrl: './createlocation.component.css'
})
export class CreatelocationComponent {
  image: File | null = null;
  location: LocationModel = new LocationModel();
  formGroup!: FormGroup;
  locations: any[] = [];
  filteredLocations: any[] = [];

  constructor(
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadLocations();

    this.formGroup = this.formBuilder.group({
      name: ['']
    });
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }

  onSubmit() {
    if (this.image) {
      const location: LocationModel = {
        ...this.formGroup.value,
      };

      this.locationService.createLocation(location, this.image).subscribe({
        next: res => {
          console.log('Location added successfully', res);
          this.router.navigate(['location']);
          this.loadLocations(); // Refresh list after adding
        },
        error: err => {
          console.error('Error adding location:', err);
        }
      });
    } else {
      alert('Please select an image.');
    }
  }

  loadLocations() {
    this.locationService.getAllLocation().subscribe({
      next: (data) => {
        this.locations = data;
        this.filteredLocations = [...this.locations]; // Set filtered locations to all
      },
      error: (err) => {
        console.error('Error loading locations', err);
      }
    });
  }

  deleteLocation(id: string): void {
    if (confirm('Are you sure you want to delete this location?')) {
      this.locationService.deleteLocation(id).subscribe({
        next: () => {
          // Filter out the deleted location from the filtered locations array
          this.filteredLocations = this.filteredLocations.filter(location => location.id !== id);
          console.log('Location deleted successfully.');
        },
        error: err => {
          console.error('Error deleting location', err);
        }
      });
    }
  }

  updateLocation(id: string) {
    this.router.navigate(['/update', id]);
  }
}

